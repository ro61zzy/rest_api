"use client";

import { useEffect, useState } from "react";
import { supabase } from "./lib/supabase";

export default function Blogs() {
  const [blogs, setBlogs] = useState<any[]>([]);

  useEffect(() => {
    async function getApprovedBlogs() {
      const { data, error } = await supabase.from("blogs").select("*").eq("status", "approved");
      if (error) console.error(error);
      else setBlogs(data);
    }
    getApprovedBlogs();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Blogs</h1>
      {blogs.map((blog) => (
        <div key={blog.id} className="border p-4 mb-2">
          <h3 className="text-lg font-bold">{blog.title}</h3>
          <p>{blog.content}</p>
        </div>
      ))}
    </div>
  );
}
