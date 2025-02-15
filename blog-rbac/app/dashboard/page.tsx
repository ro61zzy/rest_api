//app/dashboard/page.tsx
"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [role, setRole] = useState<string | null>(null);
  const [blogs, setBlogs] = useState<any[]>([]);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function getUserRole() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/auth");
        return;
      }
      
      setUserEmail(user.email ?? null);


      const { data, error } = await supabase
        .from("users")
        .select("role")
        .eq("email", user.email)
        .single();
      
      if (error) console.error(error);
      else setRole(data.role);
    }

    async function getBlogs(userEmail: string | null) {
      if (!userEmail) return;
    
      let query = supabase.from("blogs").select("*");
      if (role === "user") {
        query = query.eq("user_email", userEmail); // Fetch only user blogs
      }
    
      const { data, error } = await query;
      if (error) console.error(error);
      else setBlogs(data);
    }
    

    getUserRole();
    getBlogs(userEmail);
  }, []);

  async function approveBlog(blogId: string) {
    const { error } = await supabase
      .from("blogs")
      .update({ status: "approved" })
      .eq("id", blogId);

    if (error) alert(error.message);
    else {
      alert("Blog approved!");
      setBlogs((prevBlogs) =>
        prevBlogs.map((blog) =>
          blog.id === blogId ? { ...blog, status: "approved" } : blog
        )
      );
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      {role === "admin" ? (
        <div>
          <h2 className="text-xl font-bold mt-4">Pending Blogs</h2>
          {blogs.some((blog) => blog.status === "pending") ? (
            blogs.map((blog) =>
              blog.status === "pending" ? (
                <div key={blog.id} className="border p-4 mb-2">
                  <h3 className="text-lg font-bold">{blog.title}</h3>
                  <p>{blog.content}</p>
                  <button
                    className="bg-green-500 text-white p-2 mt-2"
                    onClick={() => approveBlog(blog.id)}
                  >
                    Approve
                  </button>
                </div>
              ) : null
            )
          ) : (
            <p>No pending blogs.</p>
          )}
        </div>
      ) : (
        <div>
          <p>
            Welcome User! You can{" "}
            <a href="/dashboard/write-blog" className="text-blue-500">
              write a blog
            </a>.
          </p>

          <h2 className="text-xl font-bold mt-4">Your Submitted Blogs</h2>
          {blogs.some((blog) => blog.userEmail === userEmail) ? (
            blogs.map((blog) =>
              blog.userEmail === userEmail ? (
                <div key={blog.id} className="border p-4 mb-2">
                  <h3 className="text-lg font-bold">{blog.title}</h3>
                  <p>{blog.content}</p>
                  <p className="text-sm text-gray-500">
                    Status:{" "}
                    <span
                      className={
                        blog.status === "approved"
                          ? "text-green-600"
                          : "text-orange-600"
                      }
                    >
                      {blog.status}
                    </span>
                  </p>
                </div>
              ) : null
            )
          ) : (
            <p>You have not submitted any blogs yet.</p>
          )}
        </div>
      )}
    </div>
  );
}

