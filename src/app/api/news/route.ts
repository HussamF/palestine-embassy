import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");

    // --- جديد: جلب إعدادات الشريط العاجل إذا كان الطلب يطلبه ---
    if (type === "alert") {
      const { rows } = await sql`SELECT * FROM site_settings WHERE key = 'emergency_alert'`;
      return NextResponse.json(rows[0] || {}, { status: 200 });
    }

    // جلب الأخبار والصور بطلبين منفصلين لسرعة الأداء
    const [newsResult, imagesResult] = await Promise.all([
      sql`SELECT id, title, excerpt, category, image, is_pinned, created_at FROM news ORDER BY created_at DESC`,
      sql`SELECT news_id, image_url FROM news_images`,
    ]);

    const newsRows = newsResult.rows || [];
    const imageRows = imagesResult.rows || [];

    // تجميع الصور في خريطة لسهولة الوصول
    const imagesByNewsId = imageRows.reduce((acc: any, img) => {
      if (!acc[img.news_id]) acc[img.news_id] = [];
      acc[img.news_id].push(img.image_url);
      return acc;
    }, {});

    const formattedData = newsRows.map((news) => {
      const additionalImages = imagesByNewsId[news.id] || [];

      let displayImage = "/imgs/logo.png";
      const rawImage = news.image || "";

      // التحقق من صلاحية الصورة
      const isValid =
        rawImage &&
        !rawImage.includes("placeholder") &&
        !rawImage.includes("portrait") &&
        rawImage !== "undefined";

      if (isValid) {
        displayImage = rawImage;
      } else if (additionalImages.length > 0) {
        displayImage = additionalImages[0];
      }

      // إضافة timestamp يتغير كل ساعة لضمان التحديث دون إرهاق المتصفح
      const hourStamp = new Date().getHours();
      if (displayImage.startsWith("http")) {
        const separator = displayImage.includes("?") ? "&" : "?";
        displayImage = `${displayImage}${separator}v=${hourStamp}`;
      }

      return {
        ...news,
        image: displayImage,
        images: additionalImages,
        created_at: news.created_at || new Date().toISOString(),
      };
    });

    return NextResponse.json(formattedData, {
      status: 200,
      headers: {
        "Cache-Control": "no-store, max-age=0, must-revalidate",
      },
    });
  } catch (error: any) {
    return NextResponse.json({ error: "Fetch Failed", details: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // فحص مرن للبيانات القادمة من لوحة التحكم
    const text = body.alertText || body.alert_text;
    const active = body.isAlertActive !== undefined ? body.isAlertActive : body.is_active;
    const aType = body.alertType || body.type;

    if (text !== undefined) {
      await sql`
        UPDATE site_settings 
        SET value = ${text}, 
            is_active = ${active}, 
            type = ${aType}, 
            updated_at = NOW()
        WHERE key = 'emergency_alert'
      `;
      return NextResponse.json({ message: "Alert Updated Successfully" });
    }

    // --- الكود الأصلي لنشر الأخبار كما هو ---
    const { title, excerpt, content, category, images, isPinned } = body;
    const mainImage = images && images.length > 0 ? images[0] : "";

    if (isPinned) {
      await sql`UPDATE news SET is_pinned = false`;
    }

    const result = await sql`
      INSERT INTO news (title, excerpt, content, category, image, is_pinned)
      VALUES (${title}, ${excerpt}, ${content}, ${category}, ${mainImage}, ${isPinned})
      RETURNING id
    `;

    const newsId = result.rows[0].id;
    if (Array.isArray(images)) {
      for (const imgUrl of images) {
        if (imgUrl?.trim())
          await sql`INSERT INTO news_images (news_id, image_url) VALUES (${newsId}, ${imgUrl})`;
      }
    }
    return NextResponse.json({ message: "Success", id: newsId });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { id, title, excerpt, content, category, images, isPinned } = await request.json();
    const mainImage = images && images.length > 0 ? images[0] : "";
    if (isPinned) {
      await sql`UPDATE news SET is_pinned = false WHERE id != ${id}`;
    }
    await sql`UPDATE news SET title=${title}, excerpt=${excerpt}, content=${content}, category=${category}, image=${mainImage}, is_pinned=${isPinned} WHERE id=${id}`;
    await sql`DELETE FROM news_images WHERE news_id = ${id}`;
    if (Array.isArray(images)) {
      for (const imgUrl of images) {
        if (imgUrl?.trim())
          await sql`INSERT INTO news_images (news_id, image_url) VALUES (${id}, ${imgUrl})`;
      }
    }
    return NextResponse.json({ message: "Updated" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "ID is required" }, { status: 400 });
    await sql`DELETE FROM news_images WHERE news_id = ${id}`;
    await sql`DELETE FROM news WHERE id = ${id}`;
    return NextResponse.json({ message: "Deleted" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
