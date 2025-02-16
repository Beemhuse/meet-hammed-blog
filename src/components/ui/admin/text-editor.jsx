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
