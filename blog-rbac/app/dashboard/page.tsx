//app/dashboard/page.tsx
"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [role, setRole] = useState<string | null>(null);
  const [blogs, setBlogs] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    async function getUserRole() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/auth");
        return;
      }
      const { data, error } = await supabase.from("users").select("role").eq("email", user.email).single();
      if (error) console.error(error);
      else setRole(data.role);
    }

    async function getBlogs() {
      const { data, error } = await supabase.from("blogs").select("*");
      if (error) console.error(error);
      else setBlogs(data);
    }

    getUserRole();
    getBlogs();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      {role === "admin" ? (
        <div>
          <h2 className="text-xl font-bold mt-4">Pending Blogs</h2>
          {blogs.map((blog) =>
            blog.status === "pending" ? (
              <div key={blog.id} className="border p-4 mb-2">
                <h3 className="text-lg font-bold">{blog.title}</h3>
                <p>{blog.content}</p>
                <button className="bg-green-500 text-white p-2 mt-2" onClick={() => approveBlog(blog.id)}>
                  Approve
                </button>
              </div>
            ) : null
          )}
        </div>
      ) : (
        <p>Welcome User! You can <a href="/dashboard/write-blog" className="text-blue-500">write a blog</a>.</p>
      )}
    </div>
  );
}

async function approveBlog(blogId: string) {
  const { error } = await supabase
    .from("blogs")
    .update({ status: "approved" })
    .eq("id", blogId);

  if (error) alert(error.message);
  else alert("Blog approved!");
}
