"use client";
import CustomEditor from "@/components/CustomEditor";
import React, { useState } from "react";

const CreateArticle = () => {
  const [content, setContent] = useState<string>("");

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(e.target.value);
  };
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.currentTarget.value);
  };

  console.log(content);

  return (
    <div className="mx-auto p-4 space-y-6">
      <div className="w-full p-4 border rounded-lg shadow-md bg-gray-50">
        <h2 className="text-xl font-medium mb-4 text-gray-700">
          Article Details
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={handleTitleChange}
              placeholder="Enter the article title"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={description}
              onChange={handleDescriptionChange}
              placeholder="Enter a short description"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0">
          <div className="w-full md:w-1/2 p-4 border rounded-lg shadow-md bg-gray-50">
            <h2 className="text-xl font-medium mb-4 text-gray-700">Editor</h2>
            <CustomEditor
              content={content}
              setContent={setContent}
              onChange={handleChange}
            />
          </div>

          <div className="w-full md:w-1/2 p-4 border rounded-lg shadow-md bg-white">
            <div className="mt-6">
              <h3 className="font-semibold text-xl">Preview:</h3>
              <div
                className="p-4 border rounded-md bg-gray-100"
                dangerouslySetInnerHTML={{ __html: content }}
              ></div>
            </div>
          </div>
        </div>
      </div>{" "}
    </div>
  );
};

export default CreateArticle;
