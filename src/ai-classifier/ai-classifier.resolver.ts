import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AiClassifierService } from './ai-classifier.service';
import { UploadPhotoInput } from './input/upload-photo.input';
import { ClassifiedObject } from './model/classifiedObject.model';
import { MediaService } from 'src/media/media.service';

@Resolver()
export class AiClassifierResolver {
  constructor(
    private readonly service: AiClassifierService,
    private readonly media: MediaService,
  ) {}

  @Query(() => String)
  async hello() {
    await this.media.getBuckets();
    return 'Hello World!';
  }

  @Mutation(() => ClassifiedObject)
  async classifyObject(@Args('input') input: UploadPhotoInput) {
    return this.service.classifyObject(input);
  }
}
