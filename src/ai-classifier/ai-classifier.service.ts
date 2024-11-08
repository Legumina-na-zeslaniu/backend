import { Injectable } from '@nestjs/common';
import { UploadPhotoInput } from './input/upload-photo.input';
import OpenAI from 'openai';
import { OpenAiConfig } from 'src/config/openai.config';
import { Base64Encode } from 'base64-stream';
import { ReadStream } from 'graphql-upload-ts';

@Injectable()
export class AiClassifierService {
  openAi: OpenAI;
  constructor(private readonly openAiConfig: OpenAiConfig) {
    this.openAi = new OpenAI({ apiKey: openAiConfig.getApiKey() });
  }

  async getBase64(stream: ReadStream): Promise<string> {
    return new Promise((resolve, reject) => {
      let result = '';
      stream
        .pipe(new Base64Encode())
        .on('data', (chunk: Buffer) => {
          result += chunk.toString();
        })
        .on('error', reject)
        .on('end', () => {
          resolve(result);
        });
    });
  }

  async classifyObject(input: UploadPhotoInput) {
    const prompt =
      'What is the object in the image? Answer with just the name of the object.';
    return this.callOpenAiApi(input, prompt);
  }

  async classifyProperties(input: UploadPhotoInput) {
    const prompt = 'What are the properties of the object in the image?'; //todo write prompt based on InventoryDocument
    return this.callOpenAiApi(input, prompt);
  }

  async callOpenAiApi(input: UploadPhotoInput, prompt: string) {
    const file = await input.file;
    const encodedImage = await this.getBase64(file.createReadStream());
    const response = await this.openAi.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'user',
          content: [
            { type: 'text', text: prompt },
            {
              type: 'image_url',
              image_url: {
                url: `data:image/jpeg;base64,${encodedImage}`,
              },
            },
          ],
        },
      ],
    });
    return { name: response.choices[0].message.content };
  }
}
