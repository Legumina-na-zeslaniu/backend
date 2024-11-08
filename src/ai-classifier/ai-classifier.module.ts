import { Module } from '@nestjs/common';
import { AiClassifierResolver } from './ai-classifier.resolver';
import { AiClassifierService } from './ai-classifier.service';
import { Upload } from 'src/commons/scalars/upload.scalar';

@Module({
  providers: [AiClassifierResolver, AiClassifierService, Upload],
})
export class AiClassifierModule {}
