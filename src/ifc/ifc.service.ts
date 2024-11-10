import { Injectable } from '@nestjs/common';
import { UpsertIfcModelInput } from './ifc-upsert.input';
import { Upload } from 'src/commons/scalars/upload.scalar';
import { v4 as uuidv4 } from 'uuid';
import { MediaService } from 'src/media/media.service';
import { MinioConfig } from 'src/config/minio.config';
import { IfcRepository } from './ifc.repository';

@Injectable()
export class IfcService {
  constructor(
    private readonly mediaService: MediaService,
    private readonly minioConfig: MinioConfig,
    private readonly repository: IfcRepository,
  ) {}

  async getIfc(id: string) {
    return this.repository.getIfc(id);
  }

  async getAllIfc() {
    return this.repository.getAllIfc();
  }

  //async upsertInventory(input: InventoryUpsertInput) {
  //  const serialized = {
  //    id: input.id,
  //    comments: input.comments,
  //    properties: input.properties,
  //    localization: input.localization,
  //    buildingId: input.buildingId,
  //    files: undefined,
  //  };
  //  const item = await this.repository.upsertInventory(serialized, input.id);
  //  if (input.files) {
  //    const filePaths = await this.uploadFiles(input.files, item.id);
  //    serialized.files = filePaths;
  //    return this.repository.upsertInventory({ files: filePaths }, item.id);
  //  }
  //  return item;
  //}

  private async uploadFiles(file: Upload, id: string) {
    const syncFile = await file;
    const ext = syncFile.filename.split('.').pop();
    const path = `${id}/${uuidv4()}.${ext}`;
    await this.mediaService.uploadFile(syncFile.createReadStream(), path);
    return `https://${this.minioConfig.getPublicUrl()}/${this.minioConfig.getBucket()}/${path}`;
  }

  async upsertIfcModel(input: UpsertIfcModelInput) {
    const serialized = {
      id: input.id,
      file: undefined,
      name: input.name,
    };
    const ifcModel = await this.repository.upsert(serialized, input.id);
    serialized.file = await this.uploadFiles(input.file, ifcModel.id);
    return this.repository.upsert(serialized, ifcModel.id);
  }
}
