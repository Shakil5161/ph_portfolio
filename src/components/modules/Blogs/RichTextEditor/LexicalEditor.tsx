"use client";

import {
  InitialConfigType,
  LexicalComposer,
} from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";

import { CodeNode } from "@lexical/code";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { ListItemNode, ListNode } from "@lexical/list";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";

import { useState } from "react";
import ToolbarPlugin from "./ToolbarPlugin";

interface RichTextEditorProps {
  name: string;
  value?: string;
  onChange?: (value: string) => void;
}

export default function RichTextEditor({
  name,
  value = "",
  onChange,
}: RichTextEditorProps) {
  const [initialContent] = useState(value);

  const editorConfig: InitialConfigType = {
    namespace: "NextBlogEditor",
    theme: {
      paragraph: "mb-2",
      text: {
        bold: "font-semibold",
        italic: "italic",
        underline: "underline",
      },
      quote:
        "border-l-4 border-gray-300 dark:border-gray-700 pl-4 italic text-gray-600 dark:text-gray-300",
      heading: {
        h1: "text-2xl font-bold mb-2",
        h2: "text-xl font-semibold mb-2",
        h3: "text-lg font-medium mb-2",
      },
    },
    onError: (error: Error) => console.error("Lexical Error:", error),
    nodes: [HeadingNode, QuoteNode, ListNode, ListItemNode, LinkNode, AutoLinkNode, CodeNode],
  };

  return (
    <div className="rounded-lg border border-gray-300 dark:border-gray-700 shadow-sm bg-white dark:bg-gray-900 overflow-hidden">
      <LexicalComposer initialConfig={editorConfig}>
        <ToolbarPlugin />

        <div className="p-3">
          <RichTextPlugin
            contentEditable={
              <ContentEditable className="min-h-[250px] p-3 focus:outline-none prose dark:prose-invert max-w-none" />
            }
            placeholder={<div className="text-gray-400">Start writing your content...</div>}
            ErrorBoundary={LexicalErrorBoundary}
          />

          <HistoryPlugin />

          <OnChangePlugin
            onChange={(editorState) => {
              editorState.read(() => {
                const json = JSON.stringify(editorState.toJSON());
                onChange?.(json);
              });
            }}
          />
        </div>

        <input type="hidden" name={name} value={value} />
      </LexicalComposer>
    </div>
  );
}
