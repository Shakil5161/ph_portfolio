"use client";

import { updateBlog } from "@/action/updateBlog";
import Form from "next/form";
import { useEffect, useState } from "react";
import LexicalEditor from "./RichTextEditor/LexicalEditor";

interface EditBlogFormProps {
  blog: any;
}

export default function EditBlogForm({ blog }: EditBlogFormProps) {
  const [content, setContent] = useState(blog?.content || "");
  const [isFeatured, setIsFeatured] = useState(
    blog?.isFeatured ? "true" : "false"
  );

  // Preload Lexical content (if stored as JSON)
  useEffect(() => {
    if (blog?.content) {
      try {
        const parsed = JSON.parse(blog.content);
        setContent(parsed);
      } catch (error) {
        console.error("Error parsing blog content:", error);
        setContent(blog.content);
      }
    }
  }, [blog]);

  return (
    <Form
      action={updateBlog}
      className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg space-y-4 w-full"
    >
      <h2 className="text-xl font-semibold mb-4">Update Blog</h2>

      {/* Blog ID (hidden) */}
      <input type="hidden" name="id" value={blog.id} />

      {/* Title */}
      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="title">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          defaultValue={blog.title}
          className="w-full rounded-md border px-3 py-2 focus:ring focus:ring-blue-200"
        />
      </div>

      {/* Content */}
      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="content">
          Content
        </label>
        <LexicalEditor name="content" value={content} onChange={setContent} />
      </div>

      {/* Thumbnail */}
      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="thumbnail">
          Thumbnail URL
        </label>
        <input
          type="url"
          id="thumbnail"
          name="thumbnail"
          defaultValue={blog.thumbnail}
          className="w-full rounded-md border px-3 py-2 focus:ring focus:ring-blue-200"
        />
      </div>

      {/* Tags */}
      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="tags">
          Tags (comma separated)
        </label>
        <input
          type="text"
          id="tags"
          name="tags"
          defaultValue={blog.tags?.join(", ")}
          placeholder="Next.js, React, Web Development"
          className="w-full rounded-md border px-3 py-2 focus:ring focus:ring-blue-200"
        />
      </div>

      {/* Featured */}
      <div>
        <p className="block text-sm font-medium mb-1">Featured</p>
        <div className="flex gap-6">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="isFeatured"
              value="true"
              checked={isFeatured === "true"}
              onChange={(e) => setIsFeatured(e.target.value)}
              className="text-blue-600 focus:ring-blue-500"
            />
            Yes
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="isFeatured"
              value="false"
              checked={isFeatured === "false"}
              onChange={(e) => setIsFeatured(e.target.value)}
              className="text-blue-600 focus:ring-blue-500"
            />
            No
          </label>
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white font-medium py-2 rounded-md hover:bg-blue-700 transition"
      >
        Update Blog
      </button>
    </Form>
  );
}
