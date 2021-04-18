import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import * as admin from 'firebase-admin'
import { ServiceAccount } from "firebase-admin"
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const configService: ConfigService = app.get(ConfigService)
  const firebaseConfiguration = configService.get<any>('firebase')

  const adminConfig: ServiceAccount = {
    "projectId": firebaseConfiguration.project_id,
    "privateKey": firebaseConfiguration.private_key,
    "clientEmail": firebaseConfiguration.client_email,
  }

  admin.initializeApp({
    credential: admin.credential.cert(adminConfig),
    databaseURL: firebaseConfiguration.database_url,
  })

  app.enableCors()
  await app.listen(4200)
}
bootstrap()
