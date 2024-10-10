import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setSwaggerSettings(app) {
	const config = new DocumentBuilder()
		.setTitle('пробная API документация, для тестового приложения')
		.setDescription('Данная документация создана для обучения swagger')
		.setVersion('1.0')
		.addTag('example')
		.build();

	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('api', app, document);
}
