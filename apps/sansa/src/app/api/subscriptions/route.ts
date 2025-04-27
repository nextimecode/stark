import { handleOptionsRequest } from "@/lib/handle-options";
import { setCorsHeaders } from "@/lib/set-cors-headers";
import { NextResponse } from "next/server";
import { z } from "zod";
import { extendZodWithOpenApi } from "zod-openapi";
extendZodWithOpenApi(z);

export const subscriptionSchema = z
  .object({
    name: z
      .string()
      .openapi({ description: "Nome do assinante", example: "Pedro Duarte" }),
    email: z.string().email().openapi({
      description: "Email do assinante",
      example: "pedro@example.com",
    }),
  })
  .openapi({ ref: "Subscription", description: "Dados para inscrição" });

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email } = subscriptionSchema.parse(body);

    // TODO: salvar no banco de dados

    const response = NextResponse.json({ name, email }, { status: 201 });
    const origin = request.headers.get("origin");
    setCorsHeaders(origin, response);

    return response;
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Validation failed" },
      { status: 400 },
    );
  }
}

export const OPTIONS = handleOptionsRequest;
