import { Injectable } from '@nestjs/common';
import { InventoryRepository } from './inventory.repository';
import { InventoryDocument } from './inventory.schema';

@Injectable()
export class InventoryService {
  constructor(private readonly repository: InventoryRepository) {}

  async getInventory(id: string) {
    return this.repository.getInventory(id);
  }

  async getAllInventory() {
    return this.repository.getAllInventory();
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
