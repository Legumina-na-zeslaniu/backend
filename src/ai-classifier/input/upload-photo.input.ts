import { Field, InputType } from '@nestjs/graphql';
import { Upload } from 'src/commons/scalars/upload.scalar';

@InputType()
export class UploadPhotoInput {
  @Field(() => Upload)
  file!: Upload;
}
