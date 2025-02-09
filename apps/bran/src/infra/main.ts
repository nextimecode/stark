import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

import { AppModule } from './app.module'
import { EnvService } from './env/env.service'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // logger: false,
  })

  // TODO: precisa configurar o Swagger para ficar automático com o zod

  const config = new DocumentBuilder()
    .setTitle('Documentação da API')
    .setDescription('Descrição da API')
    .setVersion('1.0')
    .addTag('Bran')
    .build()

  const documentFactory = () => SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, documentFactory)

  const configService = app.get(EnvService)
  const port = configService.get('PORT')

  await app.listen(port)
}
bootstrap()
