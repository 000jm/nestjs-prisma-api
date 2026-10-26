
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module.js'
import { ValidationPipe } from '@nestjs/common'
import { HttpExceptionsFilter } from './common/filter/http-exceptions/http-exceptions.filter.js'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true
  }))
  app.useGlobalFilters(new HttpExceptionsFilter())
  await app.listen(process.env.PORT ?? 3000)
}
await bootstrap()
