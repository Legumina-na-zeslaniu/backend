import { Injectable, NotFoundException } from '@nestjs/common';
import { Inventory, InventoryDocument } from './inventory.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Properties } from 'src/ai-classifier/model/classifiedObject.model';

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

  async upsertInventory(input: Partial<InventoryDocument>, id?: string) {
    const item = await this.getInventory(id);
    if (item) {
      return this.updateInventory({
        comments: input.comments ?? item.comments,
        properties: input.properties
          ? this.mergeObjects(item.properties, input.properties)
          : item.properties,
        localization: input.localization ?? item.localization,
        files: input.files ?? item.files,
        buildingId: input.buildingId ?? item.buildingId,
        id,
      });
    }
    return this.createInventory(input);
  }

  async deleteProperties(properties: string[], id: string) {
    const item = await this.getInventory(id);
    if (!item) {
      throw new NotFoundException('Item not found');
    }

    const updatedProperties = item.properties.filter(
      (prop) => !properties.includes(prop.field),
    );

    return this.updateInventory({
      comments: item.comments,
      properties: updatedProperties,
      localization: item.localization,
      id,
    });
  }

  private mergeObjects(obj1: Properties[], obj2: Properties[]): Properties[] {
    const merged = [...obj1]; // Start with a copy of obj1 to avoid mutation

    obj2.forEach((item2) => {
      const index = merged.findIndex((item1) => item1.field === item2.field);

      if (index !== -1) {
        // Update existing field
        merged[index].value = item2.value;
      } else {
        // Append new field
        merged.push(item2);
      }
    });

    return merged;
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
