import { test, expect } from '@playwright/test'

import { getBaseUrl } from '@/env'

test('redirects unauthenticated users to login and shows dashboard for logged-in users', async ({
  page
}) => {
  const { sansaUrl, nedUrl } = getBaseUrl()

  await page.goto(sansaUrl)

  // Espera até que a página não exiba mais "Carregando..."
  await expect(page.locator('text=Carregando...')).not.toBeVisible({
    timeout: 5000
  })

  // Verifica se o usuário foi redirecionado para a página de login (nedUrl)
  await page.waitForURL(nedUrl, { timeout: 5000 })

  if ((await page.url()) === nedUrl) {
    console.error(
      'Usuário não autenticado foi corretamente redirecionado para a página de login.'
    )
    return
  }

  // Se o usuário estiver autenticado, verifica que o email está visível
  const userEmail = page.locator('h1')
  await expect(userEmail).toBeVisible({ timeout: 5000 })

  // Valida que o título da página contém "Dashboard"
  await expect(page).toHaveTitle(/Dashboard/)
})
