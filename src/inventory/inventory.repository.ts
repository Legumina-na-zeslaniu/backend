import { Injectable, NotFoundException } from '@nestjs/common';
import { Inventory, InventoryDocument } from './inventory.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class InventoryRepository {
  constructor(
    @InjectModel(Inventory.name)
    private readonly inventoryModel: Model<InventoryDocument>,
  ) {}
  async getInventory(id: string) {
    return this.inventoryModel.findById(id);
  }

  async getAllInventory() {
    return this.inventoryModel.find();
  }

  async createInventory(input: Partial<InventoryDocument>) {
    return this.inventoryModel.create(input);
  }

  async updateInventory(input: Partial<InventoryDocument>) {
    const item = await this.inventoryModel.findByIdAndUpdate(input.id, input, {
      new: true,
    });
    if (!item) {
      throw new NotFoundException('Item not found');
    }
    return item;
  }

  async deleteInventory(id: string) {
    return this.inventoryModel.findByIdAndDelete(id);
  }
}
