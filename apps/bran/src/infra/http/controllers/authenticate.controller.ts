import { Controller, Post, Body, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';
import { ApiTags, ApiBody } from '@nestjs/swagger';

import { AuthenticateStudentUseCase } from '@/domain/forum/application/use-cases/authenticate-student';
import { WrongCredentialsError } from '@/domain/forum/application/use-cases/errors/wrong-credentials-error';
import { Public } from '@/infra/auth/public';

// Defina o schema Zod
const authenticateBodySchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

// Converta para um DTO
export class AuthenticateBodyDto extends createZodDto(authenticateBodySchema) {}

@ApiTags('Sessions')
@Controller('/sessions')
@Public()
export class AuthenticateController {
  constructor(private authenticateStudent: AuthenticateStudentUseCase) {}

  @Post()
  @ApiBody({ type: AuthenticateBodyDto }) // Descreve o Body no Swagger
  async handle(@Body() body: AuthenticateBodyDto) {
    const { email, password } = body;

    const result = await this.authenticateStudent.execute({
      email,
      password,
    });

    if (result.isLeft()) {
      const error = result.value;

      switch (error.constructor) {
        case WrongCredentialsError:
          throw new UnauthorizedException(error.message);
        default:
          throw new BadRequestException(error.message);
      }
    }

    const { accessToken } = result.value;

    return {
      access_token: accessToken,
    };
  }
}
