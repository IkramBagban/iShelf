"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { FaBold, FaItalic, FaUnderline, FaLink } from "react-icons/fa";

const CustomEditor = ({ content, setContent, onChange }) => {
  const applyStyle = (style: string) => {
    const selectedText = window.getSelection()?.toString() || "";
    if (selectedText) {
      const newText = content.replace(
        selectedText,
        `<${style}>${selectedText}</${style}>`
      );
      setContent(newText);
    }
  };

  const applyLink = () => {
    const selectedText = window.getSelection()?.toString() || "";
    if (selectedText) {
      const url = prompt("Enter the URL:");
      if (url && isValidUrl(url)) {
        const newText = content.replace(
          selectedText,
          `<a href="${url}" target="_blank">${selectedText}</a>`
        );
        setContent(newText);
      } else {
        alert("Please enter a valid URL.");
      }
    }
  };

  const isValidUrl = (url: string) => {
    const regex = /^(ftp|http|https):\/\/[^ "]+$/;
    return regex.test(url);
  };

  const handleInputChange = (e: React.FormEvent<HTMLDivElement>) => {
    setContent(e.currentTarget.innerHTML);
  };

  return (
    <div className="p-6 space-y-4">
      <div className="flex gap-4 mb-4">
        <Button variant="outline" onClick={() => applyStyle("strong")}>
          <FaBold />
        </Button>
        <Button variant="outline" onClick={() => applyStyle("em")}>
          <FaItalic />
        </Button>

        <Button variant="outline" onClick={applyLink}>
          <FaLink />
        </Button>
      </div>

      <div
        contentEditable
        onInput={handleInputChange}
        dangerouslySetInnerHTML={{ __html: content }}
        placeholder="Start typing here..."
        className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[200px]"
      ></div>
    </div>
  );
};

export default CustomEditor;
