import { Injectable } from '@nestjs/common';
import { InventoryRepository } from './inventory.repository';
import { InventoryDocument } from './inventory.schema';
import { InventoryUpsertInput } from './input/inventory-upsert.input';
import { InventoryDeletePropertiesInput } from './input/inventory-delete-properties.input';
import { Upload } from 'src/commons/scalars/upload.scalar';
import { MediaService } from 'src/media/media.service';
import { v4 as uuidv4 } from 'uuid';
import { MinioConfig } from 'src/config/minio.config';

@Injectable()
export class InventoryService {
  constructor(
    private readonly repository: InventoryRepository,
    private readonly mediaService: MediaService,
    private readonly minioConfig: MinioConfig,
  ) {}

  async getInventory(id: string) {
    return this.repository.getInventory(id);
  }

  async getAllInventory() {
    return this.repository.getAllInventory();
  }

  async uploadFiles(files: Upload[], id: string) {
    return Promise.all(
      files.map(async (file) => {
        const syncFile = await file;
        const ext = syncFile.filename.split('.').pop();
        const path = `${id}/${uuidv4()}.${ext}`;
        await this.mediaService.uploadFile(syncFile.createReadStream(), path);
        return `https://${this.minioConfig.getPublicUrl()}/${this.minioConfig.getBucket()}/${path}`;
      }),
    );
  }

  async upsertInventory(input: InventoryUpsertInput) {
    const serialized = {
      id: input.id,
      comments: input.comments,
      properties: input.properties,
      localization: input.localization,
      buildingId: input.buildingId,
      files: undefined,
    };
    const item = await this.repository.upsertInventory(serialized, input.id);
    if (input.files) {
      const filePaths = await this.uploadFiles(input.files, item.id);
      serialized.files = filePaths;
      return this.repository.upsertInventory({ files: filePaths }, item.id);
    }
    return item;
  }

  async deleteProperties(input: InventoryDeletePropertiesInput) {
    return this.repository.deleteProperties(input.properties, input.id);
  }

  async createInventory(input: Partial<InventoryDocument>) {
    return this.repository.createInventory(input);
  }

  async updateInventory(input: Partial<InventoryDocument>) {
    return this.repository.updateInventory(input);
  }

  async deleteInventory(id: string) {
    return this.repository.deleteInventory(id);
  }
}
