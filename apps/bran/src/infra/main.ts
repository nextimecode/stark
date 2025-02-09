import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { EnvService } from './env/env.service'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // logger: false,
  })

  const configService = app.get(EnvService)
  const port = configService.get('PORT')

  if (process.env.VERCEL_ENV === undefined) {
    await app.listen(port);
    console.error(`API rodando em http://localhost:${port}`);
  }
}
bootstrap()
