"use client";

import React, { useEffect, useImperativeHandle, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css"; // Quill styles

const TextEditor = React.forwardRef(
  ({ defaultValue, readOnly, onSelectionChange, onTextChange }, ref) => {
    const editorRef = useRef(null);
    const quillInstance = useRef(null);

    useEffect(() => {
      if (!editorRef.current || quillInstance.current) return;

      // Initialize Quill
      quillInstance.current = new Quill(editorRef.current, {
        theme: "snow",
        readOnly,
        modules: {
          toolbar: [
            [{ header: [1, 2, false] }],
            ["bold", "italic", "underline", "strike"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["blockquote", "code-block"],
            [{ align: [] }],
            [{ color: [] }, { background: [] }],
            ["link", "image", "video"],
            ["clean"],
          ],
        },
      });

      // Set default content if provided
      if (defaultValue) {
        quillInstance.current.setContents(defaultValue);
      }

      // Listen for selection changes
      quillInstance.current.on("selection-change", (range) => {
        if (onSelectionChange) onSelectionChange(range);
      });

      // Listen for text changes
      quillInstance.current.on("text-change", (delta, oldDelta, source) => {
        if (onTextChange) onTextChange(quillInstance.current.getContents());
      });
    }, [onTextChange, defaultValue, onSelectionChange, readOnly]);

    useEffect(() => {
      if (quillInstance.current) {
        quillInstance.current.enable(!readOnly);
      }
    }, [readOnly]);

    // Expose methods to parent component
    useImperativeHandle(ref, () => ({
      getLength: () => quillInstance.current?.getLength(),
      getContents: () => quillInstance.current?.getContents(),
      getHTML: () => editorRef.current?.querySelector(".ql-editor").innerHTML, // Optionally expose HTML
    }));

    return (
      <div className="border rounded-lg h-[40vh] overflow-hidden" ref={editorRef} />
    );
  }
);
TextEditor.displayName = "TextEditor";

export default TextEditor;
// "use client";

// import { useEditor, EditorContent } from "@tiptap/react";
// import { nanoid } from "nanoid";
// // import "tiptap/styles.css"; // Add custom styles if needed

// import Image from "next/image";
// import StarterKit from "@tiptap/starter-kit";
// import Heading from "@tiptap/extension-heading";
// import ListItem from "@tiptap/extension-list-item";
// import BulletList from "@tiptap/extension-bullet-list";
// import OrderedList from "@tiptap/extension-ordered-list";
// import Blockquote from "@tiptap/extension-blockquote";
// // import Image from "@tiptap/extension-image";
// import { useEffect } from "react";
// import {
//   Bold,
//   Italic,
//   List,
//   ListOrdered,
//   Quote,
//   Heading1,
//   Heading2,
//   Heading3,
// } from "lucide-react";
// import { FaImage } from "react-icons/fa";

// const TextEditor = ({ value, onChange }) => {
//   const editor = useEditor({
//     extensions: [
//       StarterKit,
//       Heading.configure({ levels: [1, 2, 3] }), // Support multiple heading levels
//       ListItem,
//       BulletList.configure({ HTMLAttributes: { class: "list-disc ml-4" } }),
//       OrderedList.configure({ HTMLAttributes: { class: "list-decimal ml-4" } }),
//       Blockquote,
//       Image, // ✅ Added Image Support
//     ],
//     editorProps: {
//       attributes: {
//         class:
//           "shadow appearance-none min-h-[150px] border rounded w-full py-2 px-3 bg-white text-black text-sm mt-0 md:mt-3 leading-tight focus:outline-none focus:shadow-outline",
//       },
//     },
//     content: value ? formatToHtml(value) : "", // Load initial value
//     onUpdate: ({ editor }) => {
//       const json = editor.getJSON();
//       const portableText = formatToPortableText(json);
//       onChange(portableText);
//     },
//   });

//   useEffect(() => {
//     if (editor && value) {
//       editor.commands.setContent(formatToHtml(value));
//     }
//   }, [value, editor]);

//   // ✅ Handle Image Upload
//   const handleImageUpload = () => {
//     const url = prompt("Enter image URL:");
//     if (url) {
//       editor.chain().focus().setImage({ src: url }).run();
//     }
//   };

//   return (
//     <div className="border rounded p-2">
//       {/* ✅ Toolbar */}
//       <div className="flex space-x-2 border-b pb-2 mb-2">
//         <ToolbarButton editor={editor} type="bold" title="Bold (Ctrl+B)">
//           <Bold size={16} />
//         </ToolbarButton>
//         <ToolbarButton editor={editor} type="italic" title="Italic (Ctrl+I)">
//           <Italic size={16} />
//         </ToolbarButton>
//         <ToolbarButton editor={editor} type="bulletList" title="Bullet List">
//           <List size={16} />
//         </ToolbarButton>
//         <ToolbarButton editor={editor} type="orderedList" title="Ordered List">
//           <ListOrdered size={16} />
//         </ToolbarButton>
//         <ToolbarButton editor={editor} type="blockquote" title="Blockquote">
//           <Quote size={16} />
//         </ToolbarButton>
//         <ToolbarButton
//           editor={editor}
//           type="heading"
//           level={1}
//           title="Heading 1"
//         >
//           <Heading1 size={16} />
//         </ToolbarButton>
//         <ToolbarButton
//           editor={editor}
//           type="heading"
//           level={2}
//           title="Heading 2"
//         >
//           <Heading2 size={16} />
//         </ToolbarButton>
//         <ToolbarButton
//           editor={editor}
//           type="heading"
//           level={3}
//           title="Heading 3"
//         >
//           <Heading3 size={16} />
//         </ToolbarButton>
//         <button
//           type="button"
//           onClick={handleImageUpload}
//           className="p-2 rounded hover:bg-gray-100"
//           title="Insert Image"
//         >
//           <FaImage size={16} />
//         </button>
//       </div>
//       {/* ✅ Editor Content */}
//       <EditorContent editor={editor} />
//     </div>
//   );
// };

// export default TextEditor;

// // ✅ Toolbar Button Component with Active State
// const ToolbarButton = ({ editor, type, level, title, children }) => {
//   if (!editor) return null;

//   const isActive =
//     type === "heading"
//       ? editor.isActive(type, { level })
//       : editor.isActive(type);

//   const handleClick = () => {
//     if (type === "heading") {
//       editor.chain().focus().toggleHeading({ level }).run();
//     } else {
//       editor
//         .chain()
//         .focus()
//         [`toggle${type.charAt(0).toUpperCase() + type.slice(1)}`]()
//         .run();
//     }
//   };

//   return (
//     <button
//       type="button"
//       onClick={handleClick}
//       className={`p-2 rounded ${isActive ? "bg-gray-200" : "hover:bg-gray-100"}`}
//       title={title}
//     >
//       {children}
//     </button>
//   );
// };

// // ✅ Convert Portable Text to HTML
// const formatToHtml = (portableText) => {
//   return portableText
//     .map(
//       (block) => `<p>${block.children.map((span) => span.text).join("")}</p>`
//     )
//     .join("");
// };

// // ✅ Convert Tiptap JSON to Portable Text for Sanity
// const formatToPortableText = (json) => {
//   return json.content.map((block) => ({
//     _type: "block",
//     style: "normal",
//     children: block.content
//       ? block.content.map((span) => ({
//           _type: "span",
//           text: span.text || "",
//           marks: [],
//         }))
//       : [],
//   }));
// };
