import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql/dist/graphql.module';
import { ConfigModule } from './config/config.module';
import { ApolloDriver } from '@nestjs/apollo';
import { ServerConfig } from './config/server.config';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseConfig } from './config/database.config';
import { AiClassifierModule } from './ai-classifier/ai-classifier.module';
import { InventoryModule } from './inventory/inventory.module';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';

@Module({
  imports: [
    ConfigModule,
    GraphQLModule.forRootAsync({
      imports: [ConfigModule],
      driver: ApolloDriver,
      useFactory: (serverConfig: ServerConfig) => ({
        autoSchemaFile: 'schema.gql',
        introspection: serverConfig.getEnableIntrospection(),
        playground: false,

        plugins: [ApolloServerPluginLandingPageLocalDefault()],
      }),
      inject: [ServerConfig],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useExisting: DatabaseConfig,
    }),
    AiClassifierModule,
    InventoryModule,
  ],
})
export class AppModule {}
