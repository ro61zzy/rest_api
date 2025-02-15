import { NextResponse } from "next/server";
import { supabase } from "@/app/lib/supabase";

export async function POST(req: Request) {
  const { title, content, userId } = await req.json();

  // Check if the user exists
  const { data: user, error: userError } = await supabase
    .from("users")
    .select("id")
    .eq("id", userId)
    .single();

  if (!user || userError) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  // Insert the blog post
  const { data, error } = await supabase
    .from("blogs")
    .insert([{ title, content, author_id: userId }])
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ blog: data }, { status: 201 });
}
