import { Injectable } from '@nestjs/common';
import * as Minio from 'minio';

import { MinioConfig } from 'src/config/minio.config';
@Injectable()
export class MediaService {
  private minioClient: Minio.Client;
  constructor(private readonly minioConfig: MinioConfig) {
    this.minioClient = new Minio.Client({
      endPoint: this.minioConfig.getHost(),
      port: this.minioConfig.getMinioPort(),
      useSSL: true,
      accessKey: this.minioConfig.getAccessKey(),
      secretKey: this.minioConfig.getSecretKey(),
    });
  }

  async getBuckets() {
    console.log(await this.minioClient.listBuckets());
    return this.minioClient.listBuckets();
  }

  private stream2buffer(stream: NodeJS.ReadableStream): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const _buf = [];

      stream.on('data', (chunk) => _buf.push(chunk));
      stream.on('end', () => resolve(Buffer.concat(_buf)));
      stream.on('error', (err) => reject(err));
    });
  }

  async uploadFile(file: NodeJS.ReadableStream, filename: string) {
    return this.minioClient.putObject(
      this.minioConfig.getBucket(),
      filename,
      await this.stream2buffer(file),
    );
  }
}
