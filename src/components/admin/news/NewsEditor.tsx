"use client";
import { useEditor, EditorContent, Extension } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Link from "@tiptap/extension-link";
import Color from "@tiptap/extension-color";
import { TextStyle } from "@tiptap/extension-text-style";
import { useEffect, useState } from "react";
import {
  FaBold,
  FaItalic,
  FaUnderline,
  FaAlignRight,
  FaAlignCenter,
  FaAlignLeft,
  FaImage,
  FaListUl,
  FaListOl,
  FaLink,
  FaPalette,
  FaTextHeight,
} from "react-icons/fa";

const FontSize = Extension.create({
  name: "fontSize",
  addOptions() {
    return { types: ["textStyle"] };
  },
  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          fontSize: {
            default: null,
            parseHTML: (element) => element.style.fontSize,
            renderHTML: (attributes) => {
              if (!attributes.fontSize) return {};
              return { style: `font-size: ${attributes.fontSize}` };
            },
          },
        },
      },
    ];
  },
});

export default function NewsEditor({
  editingId,
  cancelEdit,
  title,
  setTitle,
  excerpt,
  setExcerpt,
  fullContent,
  setFullContent,
  selectedMedia,
  handleFileSelection,
  removeMedia,
  photoInputRef,
  videoInputRef,
}: any) {
  const [mounted, setMounted] = useState(false);
  const [externalUrl, setExternalUrl] = useState("");
  const [, setUpdate] = useState(0);
  const [currentFontSize, setCurrentFontSize] = useState("18px");
  const [currentTextColor, setCurrentTextColor] = useState("#000000");

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {},
        orderedList: {},
      }),
      TextStyle,
      Color,
      FontSize,
      Underline,
      TextAlign.configure({ types: ["heading", "paragraph"] } as any),
      Link.configure({ openOnClick: false }),
    ],
    content: fullContent,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      setFullContent(editor.getHTML());
    },
    onSelectionUpdate: ({ editor }) => {
      const attrs = editor.getAttributes("textStyle");
      setCurrentFontSize(attrs.fontSize || "18px");
      setCurrentTextColor(attrs.color || "#000000");
      setUpdate((prev) => prev + 1);
    },
    editorProps: {
      attributes: {
        class:
          "prose prose-slate max-w-none min-h-[400px] p-6 outline-none text-right font-sans text-black text-lg leading-relaxed shadow-inner bg-white rounded-b-[1.5rem]",
        dir: "rtl",
      },
    },
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !editor) return null;

  const fontSizes = ["14px", "16px", "18px", "20px", "24px", "30px", "36px"];
  const colors = ["#000000", "#ef4444", "#22c55e", "#3b82f6", "#eab308", "#a855f7", "#c5a059"];

  const currentSize = editor.getAttributes("textStyle").fontSize || "18px";
  const currentColor = editor.getAttributes("textStyle").color || "#000000";

  return (
    <div className="max-w-7xl mx-auto mb-12">
      <section className="bg-white rounded-[2.5rem] shadow-xl p-8 border border-slate-100">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-black text-[#1e1b4b] border-r-4 border-[#c5a059] pr-4 italic">
            {editingId ? `تعديل الخبر (ID: ${editingId})` : "إضافة خبر جديد"}
          </h2>
          {editingId && (
            <button
              type="button"
              onClick={cancelEdit}
              className="text-red-500 font-bold text-sm bg-red-50 px-4 py-2 rounded-full hover:bg-red-100 transition-colors"
            >
              إلغاء التعديل
            </button>
          )}
        </div>

        <div className="space-y-4 mb-6">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="عنوان الخبر العريض..."
            className="w-full p-5 rounded-2xl bg-slate-50 border border-slate-200 font-black text-xl text-black placeholder-slate-400 outline-none focus:border-[#c5a059] focus:bg-white transition-all"
          />
          <textarea
            rows={2}
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            placeholder="اكتب ملخصاً قصيراً..."
            className="w-full p-5 rounded-2xl bg-slate-50 border border-slate-200 font-bold text-black placeholder-slate-400 outline-none focus:border-[#c5a059] focus:bg-white transition-all resize-none"
          />
        </div>

        <div className="border-2 border-slate-100 rounded-[2rem] overflow-hidden shadow-sm">
          <div className="bg-slate-50 p-4 border-b border-slate-100 flex flex-wrap gap-2 items-center">
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={`p-3 rounded-xl transition-all ${editor.isActive("bold") ? "bg-[#1e1b4b] text-[#c5a059]" : "bg-white text-slate-600"}`}
            >
              <FaBold />
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={`p-3 rounded-xl transition-all ${editor.isActive("italic") ? "bg-[#1e1b4b] text-[#c5a059]" : "bg-white text-slate-600"}`}
            >
              <FaItalic />
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              className={`p-3 rounded-xl transition-all ${editor.isActive("underline") ? "bg-[#1e1b4b] text-[#c5a059]" : "bg-white text-slate-600"}`}
            >
              <FaUnderline />
            </button>

            <div className="w-[1px] bg-slate-300 h-8 mx-1"></div>

            {/* أداة الألوان */}
            <div className="relative group/color">
              <button
                type="button"
                className="p-3 bg-white rounded-xl border border-slate-200 flex items-center gap-2"
              >
                <div
                  className="w-5 h-5 rounded border border-slate-300 shadow-sm"
                  style={{ backgroundColor: currentTextColor }}
                ></div>
                <FaPalette className="text-slate-600" size={14} />
              </button>
              <div className="absolute top-full right-0 mt-0 pt-2 z-50 invisible group-hover/color:visible">
                <div className="p-3 bg-white shadow-2xl rounded-2xl border border-slate-100 flex gap-2">
                  {colors.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => {
                        editor.chain().focus().setColor(c).run();
                        setCurrentTextColor(c); // تحديث الواجهة يدوياً فوراً
                      }}
                      className="w-8 h-8 rounded-lg border border-slate-200 hover:scale-110 transition-transform shadow-sm"
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* أداة حجم الخط */}
            <div className="relative group/size">
              <button
                type="button"
                className="p-3 bg-white rounded-xl border border-slate-200 flex items-center gap-2 font-bold text-[13px] text-slate-600"
              >
                <FaTextHeight /> {currentFontSize}
              </button>
              <div className="absolute top-full right-0 mt-0 pt-2 z-50 invisible group-hover/size:visible">
                <div className="w-28 bg-white shadow-2xl rounded-2xl border border-slate-100 overflow-hidden">
                  {fontSizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => {
                        editor.chain().focus().setMark("textStyle", { fontSize: size }).run();
                        setCurrentFontSize(size); // تحديث الواجهة يدوياً فوراً
                      }}
                      className="w-full p-3 text-sm font-bold hover:bg-[#c5a059] hover:text-white text-right text-black transition-colors"
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="w-[1px] bg-slate-300 h-8 mx-1"></div>

            <button
              type="button"
              onClick={() => editor.chain().focus().setTextAlign("right").run()}
              className={`p-3 rounded-xl ${editor.isActive({ textAlign: "right" }) ? "bg-[#1e1b4b] text-[#c5a059]" : "bg-white text-slate-600"}`}
            >
              <FaAlignRight />
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().setTextAlign("center").run()}
              className={`p-3 rounded-xl ${editor.isActive({ textAlign: "center" }) ? "bg-[#1e1b4b] text-[#c5a059]" : "bg-white text-slate-600"}`}
            >
              <FaAlignCenter />
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().setTextAlign("left").run()}
              className={`p-3 rounded-xl transition-all ${editor.isActive({ textAlign: "left" }) ? "bg-[#1e1b4b] text-[#c5a059]" : "bg-white text-slate-600"}`}
            >
              <FaAlignLeft />
            </button>

            <div className="w-[1px] bg-slate-300 h-8 mx-1"></div>

            <button
              type="button"
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              className={`p-3 rounded-xl transition-all ${editor.isActive("bulletList") ? "bg-[#1e1b4b] text-[#c5a059]" : "bg-white text-slate-600"}`}
            >
              <FaListUl />
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              className={`p-3 rounded-xl transition-all ${editor.isActive("orderedList") ? "bg-[#1e1b4b] text-[#c5a059]" : "bg-white text-slate-600"}`}
            >
              <FaListOl />
            </button>
          </div>

          <EditorContent editor={editor} className="tiptap-editor-container" />
        </div>

        {/* Media Section - (كما هي، دراج أند دروب وتصميم الرفع) */}
        <div className="mt-8 space-y-6">
          <div
            onDrop={(e) => {
              e.preventDefault();
              handleFileSelection(e.dataTransfer.files);
            }}
            onDragOver={(e) => e.preventDefault()}
            onClick={() => photoInputRef.current?.click()}
            className="w-full p-8 bg-slate-50 border-4 border-dashed border-slate-200 rounded-[2rem] flex flex-col items-center justify-center gap-3 group hover:border-[#c5a059] hover:bg-[#c5a059]/5 transition-all cursor-pointer"
          >
            <div className="bg-white p-4 rounded-full shadow-md group-hover:scale-110 transition-transform">
              <FaImage className="text-[#c5a059]" size={28} />
            </div>
            <div className="text-center">
              <span className="block font-black text-[#1e1b4b]">
                اسحب الصور والفيديوهات هنا أو اضغط للرفع
              </span>
              <span className="text-xs text-slate-400 font-bold italic">
                يمكنك اختيار ملفات متعددة (JPG, PNG, MP4)
              </span>
            </div>
            <input
              type="file"
              ref={photoInputRef}
              hidden
              onChange={(e) => handleFileSelection(e.target.files)}
              multiple
              accept="image/*,video/*"
            />
          </div>

          <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-200">
            <div className="flex items-center gap-3 mb-4 font-black text-[#1e1b4b]">
              <FaLink className="text-[#c5a059]" /> إضافة رابط خارجي (يوتيوب)
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={externalUrl}
                onChange={(e) => setExternalUrl(e.target.value)}
                placeholder="ضع الرابط هنا..."
                className="flex-1 p-4 rounded-xl border border-slate-200 text-black placeholder-slate-400 outline-none focus:border-[#c5a059] bg-white"
              />
              <button
                type="button"
                onClick={() => setExternalUrl("")}
                className="bg-[#1e1b4b] text-white px-8 rounded-xl font-black hover:bg-opacity-90 transition-all"
              >
                إضافة
              </button>
            </div>
          </div>

          {selectedMedia.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
              {selectedMedia.map((media: any, idx: number) => (
                <div
                  key={idx}
                  className="relative aspect-video rounded-2xl overflow-hidden border-2 border-white shadow-lg group"
                >
                  <img src={media.url} className="w-full h-full object-cover" alt="preview" />
                  <button
                    type="button"
                    onClick={() => removeMedia(idx)}
                    className="absolute inset-0 bg-red-600/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity font-bold"
                  >
                    حذف
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <style jsx global>{`
        .tiptap-editor-container .ProseMirror {
          color: black !important;
          min-height: 400px;
          outline: none;
        }
        .tiptap-editor-container .ProseMirror p {
          color: black !important;
          margin: 0.5rem 0;
        }
        .tiptap-editor-container .ProseMirror ul {
          list-style-type: disc !important;
          padding-right: 2.5rem !important;
          margin: 1rem 0 !important;
        }
        .tiptap-editor-container .ProseMirror ol {
          list-style-type: decimal !important;
          padding-right: 2.5rem !important;
          margin: 1rem 0 !important;
        }
        .tiptap-editor-container .ProseMirror li {
          display: list-item !important;
          margin-bottom: 0.5rem;
          color: black !important;
        }
        .tiptap-editor-container .ProseMirror p.is-editor-empty:first-child::before {
          content: "ابدأ بكتابة تفاصيل الخبر هنا...";
          float: right;
          color: #adb5bd;
          pointer-events: none;
          height: 0;
        }
        /* هذا الكود يجعل أي فقرة محاذاتها لليسار تتحول لغة اتجاهها للانجليزية تلقائياً */
        .tiptap-editor-container .ProseMirror [style*="text-align: left"] {
          direction: ltr !important;
        }

        .tiptap-editor-container .ProseMirror [style*="text-align: right"] {
          direction: rtl !important;
        }
      `}</style>
    </div>
  );
}
