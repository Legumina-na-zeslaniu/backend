import { Module } from '@nestjs/common';
import { ConfigModule } from 'src/config/config.module';
import { MediaService } from './media.service';

@Module({
  imports: [ConfigModule],
  providers: [MediaService],
  exports: [MediaService],
})
export class MediaModule {}
