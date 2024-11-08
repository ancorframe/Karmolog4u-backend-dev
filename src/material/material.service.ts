import { FindByIdFullMaterialResponseDto } from './dto/find-by-id-full-material.dto';
import { FindAllMaterialResponseDto } from './dto/find-all-material.dto';
import {
  UpdateMaterialDto,
  UpdateMaterialResponseDto,
} from './dto/update-material.dto';
import { MaterialId } from './dto/material-id';
import {
  CreateMaterialDto,
  CreateMaterialResponseDto,
} from './dto/create-material.dto';
import { Material } from 'src/material/schemas/material.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';

@Injectable()
export class MaterialService {
  constructor(
    @InjectModel(Material.name) private materialModel: Model<Material>,
  ) {}

  async findById(id: MaterialId) {
    const material = await this.materialModel.findById(id, {});
    if (!material) {
      throw new NotFoundException('User not found');
    }
    return material;
  }

  async findByIdFull(id: MaterialId): Promise<FindByIdFullMaterialResponseDto> {
    const material = await this.materialModel.findById(id, {});
    if (!material) {
      throw new NotFoundException('User not found');
    }
    return material;
  }

  async findAll(): Promise<FindAllMaterialResponseDto[]> {
    const materials = await this.materialModel.find({});
    if (!materials) {
      throw new NotFoundException('User not found');
    }
    return materials;
  }

  async create(
    materialData: CreateMaterialDto,
  ): Promise<CreateMaterialResponseDto> {
    const material = new this.materialModel(materialData);
    await material.save();
    if (!material) {
      throw new NotFoundException('User not found');
    }
    return material;
  }

  async update(
    materialData: UpdateMaterialDto,
  ): Promise<UpdateMaterialResponseDto> {
    const material = await this.materialModel.findOneAndUpdate(
      {
        _id: materialData._id,
        'translation.lang': materialData.translations.lang,
      },

      {
        $set: {
          'translation.$': {
            title: materialData.translations.title,
            content: materialData.translations.content,
          },
        },
      },
      { new: true },
    );
    if (!material) {
      throw new NotFoundException('User not found');
    }
    return material;
  }

  async delete(id: MaterialId) {
    const material = await this.materialModel.findByIdAndDelete(id);
    if (!material) {
      throw new NotFoundException('User not found');
    }
    return material;
  }
}
