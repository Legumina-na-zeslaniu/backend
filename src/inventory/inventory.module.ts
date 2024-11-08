import { Module } from '@nestjs/common';
import { Inventory, InventorySchema } from './inventory.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { InventoryResolver } from './inventory.resolver';
import { InventoryRepository } from './inventory.repository';
import { InventoryService } from './inventory.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Inventory.name, schema: InventorySchema },
    ]),
  ],
  providers: [InventoryResolver, InventoryRepository, InventoryService],
})
export class InventoryModule {}
