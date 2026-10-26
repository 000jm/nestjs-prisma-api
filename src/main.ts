
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module.js'
import { ValidationPipe } from '@nestjs/common'
import { UnathorizedInterceptor } from './common/errors/interceptors/unathorized.interceptor.js'
import { NotFoundInterceptor } from './common/errors/interceptors/notfound.interceptor.js'
import { ConflictInterceptor } from './common/errors/interceptors/conflict.interceptor.js'
import { DatabaseInterceptor } from './common/errors/interceptors/database.interceptor.js'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true
  }))
  app.useGlobalInterceptors(new ConflictInterceptor())
  app.useGlobalInterceptors(new DatabaseInterceptor())
  app.useGlobalInterceptors(new UnathorizedInterceptor())
  app.useGlobalInterceptors(new NotFoundInterceptor())
  await app.listen(process.env.PORT ?? 3000)
}
await bootstrap()
