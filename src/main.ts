import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setSwaggerSettings } from './swagger.setting';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	setSwaggerSettings(app);
	await app.listen(3000);
}
bootstrap();
