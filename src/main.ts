
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module.js'
import { ValidationPipe } from '@nestjs/common'
import { UnathorizedInterceptor } from './common/errors/interceptors/unathorized.interceptor.js'
import { NotFoundInterceptor } from './common/errors/interceptors/notfound.interceptor.js'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true
  }))
  // app.useGlobalFilters(new HttpExceptionsFilter())
  app.useGlobalInterceptors(new UnathorizedInterceptor())
  app.useGlobalInterceptors(new NotFoundInterceptor())
  await app.listen(process.env.PORT ?? 3000)
}
await bootstrap()
