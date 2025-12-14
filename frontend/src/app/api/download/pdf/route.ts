import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/download/pdf`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }
  );

  const arrayBuffer = await response.arrayBuffer();

  return new Response(arrayBuffer, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${body.disease}.pdf"`,
    },
  });
}
