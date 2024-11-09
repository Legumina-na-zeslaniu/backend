import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { InventoryModel } from './inventory.model';
import { InventoryInput } from './input/inventory.input';
import { InventoryService } from './inventory.service';
import { Success } from 'src/commons/response/success';
import { InventoryUpsertInput } from './input/inventory-upsert.input';
import { InventoryDeletePropertiesInput } from './input/inventory-delete-properties.input';

@Resolver()
export class InventoryResolver {
  constructor(private readonly service: InventoryService) {}

  @Mutation(() => InventoryModel)
  async upsertInventory(@Args('input') input: InventoryUpsertInput) {
    return this.service.upsertInventory(input);
  }

  @Mutation(() => InventoryModel)
  async deleteInventoryProperties(
    @Args('input') input: InventoryDeletePropertiesInput,
  ) {
    return this.service.deleteProperties(input);
  }

  @Query(() => InventoryModel)
  async getInventory(@Args('input') input: InventoryInput) {
    return this.service.getInventory(input.id);
  }

  @Query(() => [InventoryModel])
  async getAllInventory() {
    return this.service.getAllInventory();
  }

  @Mutation(() => Success)
  async deleteInventory(@Args('input') input: InventoryInput) {
    await this.service.deleteInventory(input.id);
    return new Success();
  }
}
