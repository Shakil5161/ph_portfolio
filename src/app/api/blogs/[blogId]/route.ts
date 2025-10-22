
import { NextRequest } from "next/server";

export async function GET(request: NextRequest, context: { params: any }) {

  const params = context.params;
  const resolved = params && typeof params.then === "function" ? await params : params;
  const blogId = resolved?.blogId as string | undefined;

  const data = { message: "placeholder blog route", blogId };

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { "content-type": "application/json" },
  });
}
