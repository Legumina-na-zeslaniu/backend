import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AiClassifierService } from './ai-classifier.service';
import { UploadPhotoInput } from './input/upload-photo.input';
import { ClassifiedObject } from './model/classifiedObject.model';
import { ClassifiedProperties } from './model/classifiedProperties.model';

@Resolver()
export class AiClassifierResolver {
  constructor(private readonly service: AiClassifierService) {}

  @Query(() => String)
  hello() {
    return 'Hello World!';
  }

  @Mutation(() => ClassifiedObject)
  async classifyObject(@Args('input') input: UploadPhotoInput) {
    return this.service.classifyObject(input);
  }

  @Mutation(() => ClassifiedProperties)
  async classifyProperties(@Args('input') input: UploadPhotoInput) {
    return this.service.classifyProperties(input);
  }
}
