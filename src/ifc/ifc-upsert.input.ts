import { Field, InputType } from '@nestjs/graphql';
import { IsMongoId, IsOptional } from 'class-validator';
import { Upload } from 'src/commons/scalars/upload.scalar';

@InputType()
export class UpsertIfcModelInput {
  @Field(() => Upload, { nullable: true })
  @IsOptional()
  file?: Upload;

  @Field({ nullable: true })
  @IsOptional()
  name?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsMongoId()
  id?: string;
}
