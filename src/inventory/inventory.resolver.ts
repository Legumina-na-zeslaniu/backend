import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { InventoryModel } from './inventory.model';
import { InventoryCreateInput } from './input/inventory-create.input';
import { InventoryUpdateInput } from './input/inventory-update.input';
import { InventoryInput } from './input/inventory.input';
import { InventoryService } from './inventory.service';
import { Success } from 'src/commons/response/success';

@Resolver()
export class InventoryResolver {
  constructor(private readonly service: InventoryService) {}

  @Mutation(() => InventoryModel)
  async createInventory(@Args('input') input: InventoryCreateInput) {
    return this.service.createInventory(input);
  }

  @Mutation(() => InventoryModel)
  async updateInventory(@Args('input') input: InventoryUpdateInput) {
    return this.service.updateInventory(input);
  }

  @Query(() => InventoryModel)
  async getInventory(@Args('input') input: InventoryInput) {
    return this.service.getInventory(input.id);
  }

  @Mutation(() => [InventoryModel])
  async getAllInventory() {
    return this.service.getAllInventory();
  }

  @Mutation(() => Success)
  async deleteInventory(@Args('input') input: InventoryInput) {
    await this.service.deleteInventory(input.id);
    return new Success();
  }
}
