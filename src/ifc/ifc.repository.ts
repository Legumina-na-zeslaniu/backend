import { Injectable, NotFoundException } from '@nestjs/common';
import { Ifc, IfcDocument } from './ifc.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class IfcRepository {
  constructor(
    @InjectModel(Ifc.name)
    private readonly ifcModel: Model<IfcDocument>,
  ) {}

  async getIfc(id: string) {
    return this.ifcModel.findById(id);
  }

  async getAllIfc() {
    return this.ifcModel.find();
  }

  async upsert(input: Partial<IfcDocument>, id?: string) {
    const ifc = await this.getIfc(id);
    if (ifc) {
      return this.updateIfc({
        id,
        file: input.file ?? ifc.file,
        name: input.name ?? ifc.name,
      });
    }
    return this.createIfc(input);
  }

  async createIfc(input: Partial<IfcDocument>) {
    return this.ifcModel.create(input);
  }

  async updateIfc(input: Partial<IfcDocument>) {
    const ifc = await this.ifcModel.findByIdAndUpdate(input.id, input, {
      new: true,
    });
    if (!ifc) {
      throw new NotFoundException('Ifc model not found');
    }
    return ifc;
  }
}
