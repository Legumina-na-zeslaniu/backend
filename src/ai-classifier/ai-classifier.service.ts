import { Injectable } from '@nestjs/common';
import { UploadPhotoInput } from './input/upload-photo.input';

@Injectable()
export class AiClassifierService {
  constructor() {}

  async classifyObject(input: UploadPhotoInput) {
    input;
    return 'Hello World!';
  }

  async classifyProperties(input: UploadPhotoInput) {
    input;
    return 'Hello World!';
  }
}
