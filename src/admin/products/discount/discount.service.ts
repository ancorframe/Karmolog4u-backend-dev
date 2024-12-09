import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Discount } from './schemas/discount.schema';
import { Discount as DiscountInterface } from './interface/discount.interface';
import { Model } from 'mongoose';
import { CreateDiscountDto } from './dto/create-discount.dto';
import { EditDiscountDto } from './dto/edit-discount.dto';
import { FindDiscountDto } from './dto/find-discount.dto';

@Injectable()
export class DiscountService {
  constructor(
    @InjectModel(Discount.name) private discountModel: Model<Discount>,
  ) {}

  async createDiscount(discountData: CreateDiscountDto): Promise<any> {
    const discount = new this.discountModel(discountData);
    await discount.save();
    return { message: 'success' };
  }

  async editDiscount(
    discountData: EditDiscountDto,
  ): Promise<DiscountInterface> {
    const { refId, ...data } = discountData;

    return await this.discountModel
      .findOneAndUpdate({ refId: refId }, data, {
        upsert: true,
        new: true,
        projection: { start: 1, expiredAt: 1, discount: 1 },
      })
      .exec();
  }

  async findDiscount(refId: FindDiscountDto): Promise<DiscountInterface> {
    return await this.discountModel.findOne(
      { ...refId },
      'discount start expiredAt',
    );
  }

  async deleteDiscount(refId: FindDiscountDto): Promise<any> {
    console.log(refId.refId, 'sdcsd');

    await this.discountModel.findOneAndDelete({
      ...refId,
    });
    return { message: 'success' };
  }
}
