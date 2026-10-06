import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ─── Swagger setup ───────────────────────────────────────────────────────
  const config = new DocumentBuilder()
    .setTitle('Bolis API')
    .setDescription('API for managing bolis and boli categories')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const configService = app.get(ConfigService);
  const frontendUrl =
    configService.get<string>('FRONTEND_URL');
  
  const allowedOrigins = [
    frontendUrl,
    'http://localhost:5173',
  ].filter(Boolean);
  
  app.enableCors({
    origin: (origin: any, callback: any) =>{
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`Bloqueado por CORS: ${origin}`));
      }
    },
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  })

  await app.listen(process.env.PORT ?? 3000);
}

await bootstrap();
