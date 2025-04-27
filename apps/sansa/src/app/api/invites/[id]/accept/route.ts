import { handleOptionsRequest } from "@/lib/handle-options";
import { prisma } from "@/lib/prisma";
import { setCorsHeaders } from "@/lib/set-cors-headers";
import { NextResponse } from "next/server";
import { z } from "zod";
import { extendZodWithOpenApi } from "zod-openapi";

extendZodWithOpenApi(z);

const inviteParamsSchema = z
  .object({
    id: z.string().uuid().openapi({
      description: "ID do convite",
      example: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    }),
  })
  .openapi({
    ref: "InviteParams",
    description: "Parâmetros para atualização de convite",
  });

export const POST = async (
  request: Request,
  { params }: { params: { id: string } },
) => {
  try {
    const { id } = inviteParamsSchema.parse(params);

    const invite = await prisma.invite.update({
      where: { id },
      data: { status: "ACCEPTED", acceptedAt: new Date() },
    });

    const response = NextResponse.json(invite, { status: 200 });
    const origin = request.headers.get("origin");
    setCorsHeaders(origin, response);

    return response;
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Validation failed" },
      { status: 400 },
    );
  }
};

export const OPTIONS = handleOptionsRequest;
