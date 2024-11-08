import { Injectable } from '@nestjs/common';
import { UploadPhotoInput } from './input/upload-photo.input';
import OpenAI from 'openai';
import { OpenAiConfig } from 'src/config/openai.config';
import { Base64Encode } from 'base64-stream';
import { ReadStream } from 'graphql-upload-ts';
import { z } from 'zod';
import { zodResponseFormat } from 'openai/helpers/zod';

@Injectable()
export class AiClassifierService {
  openAi: OpenAI;
  constructor(private readonly openAiConfig: OpenAiConfig) {
    this.openAi = new OpenAI({ apiKey: openAiConfig.getApiKey() });
  }

  private async getBase64(stream: ReadStream): Promise<string> {
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
      'Your role is to identify object in the image and return all important properties of the object in context of keeping inventory. For example, if the object is a car, you should return properties like manufacturer, model, year, color, age, condition etc. Only provide data which you are certain about. Do not guess or provide data which is not visible in the image. If you dont have answer do not provide any data. For sure do not add location or any other data which is not related to the object.';

    const resp = await this.callOpenAiApi(input, prompt);
    console.log(resp);
    return resp;
  }

  private async callOpenAiApi(input: UploadPhotoInput, prompt: string) {
    const file = await input.file;
    const encodedImage = await this.getBase64(file.createReadStream());
    const schema = z.object({
      properties: z.array(
        z.object({
          field: z.string(),
          value: z.union([z.string(), z.number()]),
        }),
      ),
    });
    const response = await this.openAi.beta.chat.completions.parse({
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
      response_format: zodResponseFormat(schema, 'response'),
    });
    return response.choices[0].message.parsed;
  }
}
