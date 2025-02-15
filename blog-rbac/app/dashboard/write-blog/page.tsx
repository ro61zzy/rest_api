//app/dashboard/write-blog/page.tsx

"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabase";

export default function WriteBlog() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
  
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      alert("You must be logged in to submit a blog.");
      setLoading(false);
      return;
    }
  
    const response = await fetch("/api/blogs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content, userId: user.id }),
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      alert(errorData.message || "Something went wrong");
    } else {
      alert("Blog submitted for approval!");
      setTitle("");
      setContent("");
    }
  
    setLoading(false);
  };
  

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">Write a Blog</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          className="border p-2 w-full mb-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Content"
          className="border p-2 w-full mb-2"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 w-full"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit Blog"}
        </button>
      </form>
    </div>
  );
}
