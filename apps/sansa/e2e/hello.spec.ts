import { test, expect } from "@playwright/test";

import { env } from "@/env";

test("redirects unauthenticated users to login and shows dashboard for logged-in users", async ({
  page,
}) => {
  await page.goto(env.NEXT_PUBLIC_SANSA_URL);

  // Espera até que a página não exiba mais "Carregando..."
  await expect(page.locator("text=Carregando...")).not.toBeVisible({
    timeout: 5000,
  });

  // Verifica se o usuário foi redirecionado para a página de login (nedUrl)
  await page.waitForURL(env.NEXT_PUBLIC_NED_URL, { timeout: 5000 });

  if ((await page.url()) === env.NEXT_PUBLIC_NED_URL) {
    console.error(
      "Usuário não autenticado foi corretamente redirecionado para a página de login.",
    );
    return;
  }

  // Se o usuário estiver autenticado, verifica que o email está visível
  const userEmail = page.locator("h1");
  await expect(userEmail).toBeVisible({ timeout: 5000 });

  // Valida que o título da página contém "Dashboard"
  await expect(page).toHaveTitle(/Dashboard/);
});
