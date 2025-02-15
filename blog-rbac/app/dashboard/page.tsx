//app/dashboard/page.tsx
"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [role, setRole] = useState<string | null>(null);
  const [blogs, setBlogs] = useState<any[]>([]);
  const [userId, setUserId] =useState()
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function getUserData() {
      try {
        const { data: { user }, error } = await supabase.auth.getUser();
        if (error || !user) {
          router.push("/auth");
          return;
        }
  
        setUserEmail(user.email ?? null);
  
        const { data, error: userError } = await supabase
          .from("users")
          .select("id, role") // Fetch both id and role
          .eq("email", user.email)
          .single();
  
        if (userError) {
          console.error("Error fetching user data:", userError);
        } else {
          setUserId(data.id); // Store userId
          setRole(data.role); // Store role
        }
      } catch (err) {
        console.error("Unexpected error fetching user data:", err);
      }
    }
  
    getUserData();
  }, [router]);
  

  useEffect(() => {
    async function getBlogs() {
      if (!userId) return; // Ensure userId is available
  
      let query = supabase.from("blogs").select("*");
  
      if (role === "user") {
        query = query.eq("author_id", userId); // Use author_id instead of user_email
      }
  
      const { data, error } = await query;
      if (error) {
        console.error("Error fetching blogs:", error);
      } else {
        setBlogs(data);
      }
    }
  
    if (role) {
      getBlogs();
    }
  }, [userId, role]); // Replace userEmail with userId
  

  async function approveBlog(blogId: string) {
    const { error } = await supabase
      .from("blogs")
      .update({ status: "approved" })
      .eq("id", blogId);

    if (error) {
      alert(error.message);
    } else {
      alert("Blog approved!");
      setBlogs((prevBlogs) =>
        prevBlogs.map((blog) =>
          blog.id === blogId ? { ...blog, status: "approved" } : blog
        )
      );
    }
  }

  async function rejectBlog(blogId: string) {
    const reason = prompt("Enter reason for rejection:");
    if (!reason) return;

    const { error } = await supabase
      .from("blogs")
      .update({ status: "rejected", rejection_reason: reason })
      .eq("id", blogId);

    if (error) {
      alert(error.message);
    } else {
      alert("Blog rejected!");
      setBlogs((prevBlogs) =>
        prevBlogs.map((blog) =>
          blog.id === blogId ? { ...blog, status: "rejected", rejection_reason: reason } : blog
        )
      );
    }
  }

  function editBlog(blog: any) {
    alert("Edit functionality not implemented yet.");
  }

  async function deleteBlog(blogId: string) {
    if (!confirm("Are you sure you want to delete this blog?")) return;

    const { error } = await supabase.from("blogs").delete().eq("id", blogId);
    if (error) {
      alert(error.message);
    } else {
      alert("Blog deleted!");
      setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== blogId));
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      {role === "admin" ? (
        <div>
          <h2 className="text-xl font-bold mt-4">Pending Blogs</h2>
          {blogs.some((blog) => blog.status === "pending") ? (
            blogs
              .filter((blog) => blog.status === "pending")
              .map((blog) => (
                <div key={blog.id} className="border p-4 mb-2">
                  <h3 className="text-lg font-bold">{blog.title}</h3>
                  <p>{blog.content}</p>
                  <button
                    className="bg-green-500 text-white p-2 mt-2"
                    onClick={() => approveBlog(blog.id)}
                  >
                    Approve
                  </button>
                  <button
                    className="bg-red-500 text-white p-2 mt-2 ml-2"
                    onClick={() => rejectBlog(blog.id)}
                  >
                    Reject
                  </button>
                </div>
              ))
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
          {blogs.length > 0 ? (
           blogs.filter((blog) => blog.author_id === userId)
              .map((blog) => (
                <div key={blog.id} className="border p-4 mb-2">
                  <h3 className="text-lg font-bold">{blog.title}</h3>
                  <p>{blog.content}</p>
                  <p className="text-sm text-gray-500">
                    Status:{" "}
                    <span
                      className={
                        blog.status === "approved"
                          ? "text-green-600"
                          : blog.status === "rejected"
                          ? "text-red-600"
                          : "text-orange-600"
                      }
                    >
                      {blog.status}
                    </span>
                  </p>
                  <button
                    className="bg-yellow-500 text-white p-2 mt-2"
                    onClick={() => editBlog(blog)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white p-2 mt-2 ml-2"
                    onClick={() => deleteBlog(blog.id)}
                  >
                    Delete
                  </button>
                </div>
              ))
          ) : (
            <p>You have not submitted any blogs yet.</p>
          )}
        </div>
      )}
    </div>
  );
}

