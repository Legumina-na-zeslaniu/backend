import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { IfcModel } from './ifc.model';
import { UpsertIfcModelInput } from './ifc-upsert.input';
import { IfcInput } from './ifc.input';
import { IfcService } from './ifc.service';

@Resolver()
export class IfcResolver {
  constructor(private readonly service: IfcService) {}

  @Query(() => IfcModel)
  async getIfcModel(@Args('input') input: IfcInput) {
    return this.service.getIfc(input.id);
  }

  @Query(() => [IfcModel])
  async getIfcModels() {
    return this.service.getAllIfc();
  }

  @Mutation(() => IfcModel)
  async upsertIfcModel(@Args('input') input: UpsertIfcModelInput) {
    return this.service.upsertIfcModel(input);
  }
}
