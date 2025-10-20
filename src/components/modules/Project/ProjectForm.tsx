"use client";

import { createProject } from "@/action/project/createProject";
import Form from "next/form";
import { useState } from "react";
import LexicalEditor from "../RichTextEditor/LexicalEditor";

export default function ProjectForm() {
  const [isFeatured, setIsFeatured] = useState("false");
  const [techStack, setTechStack] = useState<string[]>([]);
  const [currentTech, setCurrentTech] = useState("");
  const [content, setContent] = useState("");

  const addTech = () => {
    if (currentTech.trim() && !techStack.includes(currentTech.trim())) {
      setTechStack([...techStack, currentTech.trim()]);
      setCurrentTech("");
    }
  };

  const removeTech = (techToRemove: string) => {
    setTechStack(techStack.filter(tech => tech !== techToRemove));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTech();
    }
  };

  return (
    <Form
      action={createProject}
      className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg space-y-6 w-full"
    >
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Create Project</h2>

      {/* Title */}
      <div>
        <label className="block text-sm font-medium mb-2 text-gray-700" htmlFor="title">
          Project Title *
        </label>
        <input
          type="text"
          id="title"
          name="title"
          required
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          placeholder="Enter project title"
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium mb-2 text-gray-700" htmlFor="description">
          Description *
        </label>
        <LexicalEditor name="content" value={content} onChange={setContent} />
      </div>

      {/* Tech Stack */}
      <div>
        <label className="block text-sm font-medium mb-2 text-gray-700">
          Tech Stack *
        </label>
        <div className="space-y-3">
          <div className="flex gap-2">
            <input
              type="text"
              value={currentTech}
              onChange={(e) => setCurrentTech(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Add technology (e.g., React, Node.js)"
              className="flex-1 rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
            <button
              type="button"
              onClick={addTech}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Add
            </button>
          </div>
          
          {/* Hidden input for form submission */}
          <input type="hidden" name="techStack" value={JSON.stringify(techStack)} />
          
          {/* Tech Stack Display */}
          <div className="flex flex-wrap gap-2 min-h-12">
            {techStack.map((tech, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
              >
                {tech}
                <button
                  type="button"
                  onClick={() => removeTech(tech)}
                  className="text-blue-600 hover:text-blue-800 ml-1"
                >
                  ×
                </button>
              </span>
            ))}
            {techStack.length === 0 && (
              <span className="text-gray-500 text-sm">No technologies added yet</span>
            )}
          </div>
        </div>
      </div>

      {/* Project Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Live URL */}
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700" htmlFor="liveUrl">
            Live Demo URL
          </label>
          <input
            type="url"
            id="liveUrl"
            name="liveUrl"
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            placeholder="https://your-project.com"
          />
        </div>

        {/* GitHub URL */}
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700" htmlFor="githubUrl">
            GitHub Repository URL
          </label>
          <input
            type="url"
            id="githubUrl"
            name="githubUrl"
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            placeholder="https://github.com/username/repo"
          />
        </div>
      </div>

      {/* Video URL */}
      <div>
        <label className="block text-sm font-medium mb-2 text-gray-700" htmlFor="videoUrl">
          Video Demo URL (Optional)
        </label>
        <input
          type="url"
          id="videoUrl"
          name="videoUrl"
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          placeholder="https://youtube.com/your-demo"
        />
      </div>

      {/* Project Image */}
      <div>
        <label className="block text-sm font-medium mb-2 text-gray-700" htmlFor="image">
          Project Image URL *
        </label>
        <input
          type="url"
          id="image"
          name="image"
          required
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          placeholder="https://example.com/project-image.jpg"
        />
      </div>

      {/* Featured */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <p className="block text-sm font-medium mb-3 text-gray-700">Featured Project</p>
        <div className="flex gap-6">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="radio"
              name="featured"
              value="true"
              checked={isFeatured === "true"}
              onChange={(e) => setIsFeatured(e.target.value)}
              className="text-blue-600 focus:ring-blue-500 h-4 w-4"
            />
            <span className="text-gray-700">Yes, feature this project</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="radio"
              name="featured"
              value="false"
              checked={isFeatured === "false"}
              onChange={(e) => setIsFeatured(e.target.value)}
              className="text-blue-600 focus:ring-blue-500 h-4 w-4"
            />
            <span className="text-gray-700">No, keep as regular project</span>
          </label>
        </div>
        <p className="text-sm text-gray-500 mt-2">
          Featured projects will be highlighted on your portfolio
        </p>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white font-medium py-3 rounded-md hover:bg-blue-700 transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Create Project
      </button>
    </Form>
  );
}