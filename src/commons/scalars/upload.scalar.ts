import { Scalar } from '@nestjs/graphql';
import { GraphQLUpload, ReadStream, WriteStream } from 'graphql-upload-ts';

@Scalar('Upload')
export class Upload {
  description = 'Upload files';
  filename!: string;

  parseValue(value: unknown) {
    return GraphQLUpload.parseValue(value);
  }

  serialize(value: unknown) {
    return GraphQLUpload.serialize(value);
  }

  parseLiteral(ast: any) {
    return GraphQLUpload.parseLiteral(ast, ast.value);
  }

  createReadStream(): ReadStream {
    return new ReadStream(new WriteStream());
  }
}
