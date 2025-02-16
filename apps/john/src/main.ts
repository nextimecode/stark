import { NestFactory } from '@nestjs/core'
import {
  ExpressAdapter,
  NestExpressApplication
} from '@nestjs/platform-express'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import express, { Request, Response } from 'express'

import { AppModule } from './app.module'

const server = express()

let cachedApp: NestExpressApplication | null = null

async function bootstrap(): Promise<NestExpressApplication> {
  if (!cachedApp) {
    const app = await NestFactory.create<NestExpressApplication>(
      AppModule,
      new ExpressAdapter(server)
    )

    const config = new DocumentBuilder()
      .setTitle('Bran')
      .setDescription('API para o projeto Stark')
      .setVersion('1.13.4')
      .build()

    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('api', app, document)

    await app.init()
    cachedApp = app
  }

  return cachedApp
}

export const handler = async (req: Request, res: Response): Promise<void> => {
  const app = await bootstrap()
  const expressInstance = app.getHttpAdapter().getInstance()

  expressInstance(req, res)
}
