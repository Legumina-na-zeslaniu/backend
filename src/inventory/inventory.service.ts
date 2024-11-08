import { Injectable } from '@nestjs/common';
import { InventoryRepository } from './inventory.repository';
import { InventoryDocument } from './inventory.schema';
import { InventoryUpsertInput } from './input/inventory-upsert.input';
import { InventoryDeletePropertiesInput } from './input/inventory-delete-properties.input';

@Injectable()
export class InventoryService {
  constructor(private readonly repository: InventoryRepository) {}

  async getInventory(id: string) {
    return this.repository.getInventory(id);
  }

  async getAllInventory() {
    return this.repository.getAllInventory();
  }

  async upsertInventory(input: InventoryUpsertInput) {
    return this.repository.upsertInventory(input, input.id);
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
