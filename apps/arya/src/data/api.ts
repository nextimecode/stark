import { env } from "@/env";

const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

export async function api(path: string, init?: RequestInit): Promise<Response> {
  const baseUrl = env.NEXT_PUBLIC_BRAN_URL;

  if (!baseUrl) {
    throw new Error(
      "A variável de ambiente NEXT_PUBLIC_BRAN_URL não está definida.",
    );
  }

  const apiPrefix = "/api";
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const url = new URL(`${apiPrefix}${normalizedPath}`, baseUrl);

  const retryDelay = 5 * 60 * 1000; // 5 minutos em milissegundos
  const maxRetries = 5;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetch(url, init);
      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.statusText}`);
      }
      return response;
    } catch (error) {
      if (attempt === maxRetries) {
        throw new Error(
          `Falha após ${attempt + 1} tentativa(s): ${error instanceof Error ? error.message : String(error)}`,
        );
      }
      await delay(retryDelay);
    }
  }

  throw new Error("Falha inesperada na execução da API."); // Garante que a função nunca retorne undefined
}
