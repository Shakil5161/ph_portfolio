"use client";

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  ElementFormatType,
  FORMAT_ELEMENT_COMMAND,
  FORMAT_TEXT_COMMAND,
  TextFormatType,
} from "lexical";
import {
  AlignCenter,
  AlignLeft,
  Bold,
  Italic,
  Underline
} from "lucide-react";

export default function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext();

  // ✅ Correctly typed to match Lexical's expected literal types
  const applyTextFormat = (format: TextFormatType) => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, format);
  };

  const applyAlign = (align: ElementFormatType) => {
    editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, align);
  };

  return (
    <div className="flex items-center gap-2 p-2 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
      <button
        type="button"
        onClick={() => applyTextFormat("bold")}
        className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
      >
        <Bold className="h-4 w-4" />
      </button>
      <button
        type="button"
        onClick={() => applyTextFormat("italic")}
        className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
      >
        <Italic className="h-4 w-4" />
      </button>
      <button
        type="button"
        onClick={() => applyTextFormat("underline")}
        className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
      >
        <Underline className="h-4 w-4" />
      </button>

      <div className="w-px bg-gray-300 dark:bg-gray-600 h-5" />

      <button
        type="button"
        onClick={() => applyAlign("left")}
        className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
      >
        <AlignLeft className="h-4 w-4" />
      </button>
      <button
        type="button"
        onClick={() => applyAlign("center")}
        className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
      >
        <AlignCenter className="h-4 w-4" />
      </button>

      <div className="w-px bg-gray-300 dark:bg-gray-600 h-5" />

      
    </div>
  );
}
