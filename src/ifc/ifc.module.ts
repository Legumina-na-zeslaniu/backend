import { Module } from '@nestjs/common';
import { ConfigModule } from 'src/config/config.module';
import { MediaModule } from 'src/media/media.module';
import { IfcResolver } from './ifc.resolver';
import { IfcService } from './ifc.service';
import { Ifc, IfcSchema } from './ifc.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { IfcRepository } from './ifc.repository';

@Module({
  imports: [
    MediaModule,
    ConfigModule,
    MongooseModule.forFeature([{ name: Ifc.name, schema: IfcSchema }]),
  ],
  providers: [IfcResolver, IfcService, IfcRepository],
})
export class IfcModule {}
