import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setSwaggerSettings } from './swagger.setting';
import { ZodValidationPipe } from 'nestjs-zod';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.useGlobalPipes(new ZodValidationPipe());
	setSwaggerSettings(app);
	await app.listen(3000);
}
bootstrap();
