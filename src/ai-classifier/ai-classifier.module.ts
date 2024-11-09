import { Module } from '@nestjs/common';
import { AiClassifierResolver } from './ai-classifier.resolver';
import { AiClassifierService } from './ai-classifier.service';
import { Upload } from 'src/commons/scalars/upload.scalar';
import { ConfigModule } from 'src/config/config.module';
import { MediaModule } from 'src/media/media.module';

@Module({
  imports: [ConfigModule, MediaModule],
  providers: [AiClassifierResolver, AiClassifierService, Upload],
})
export class AiClassifierModule {}
