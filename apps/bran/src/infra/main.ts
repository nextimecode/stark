import { NestFactory } from '@nestjs/core'
import { ExpressAdapter } from '@nestjs/platform-express'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import * as express from 'express'
import { AppModule } from './app.module'

const server = express()

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server))

  const config = new DocumentBuilder()
    .setTitle('Documentação da API')
    .setDescription('Descrição da API')
    .setVersion('1.0')
    .addTag('Bran')
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)

  await app.init()
}

bootstrap()

export default server
