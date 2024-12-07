import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Discount } from './schemas/discount.schema';
import { Discount as DiscountInterface } from './interface/discount.interface';
import { Model } from 'mongoose';
import { CreateDiscountDto } from './dto/create-discount.dto';
import { EditDiscountDto } from './dto/edit-discount.dto';

@Injectable()
export class DiscountService {
  constructor(
    @InjectModel(Discount.name) private discountModel: Model<Discount>,
  ) {}

  async createDiscount(
    discountData: CreateDiscountDto,
  ): Promise<DiscountInterface> {
    const discount = new this.discountModel(discountData);
    await discount.save();
    return discount;
  }

  async editDiscount(
    discountData: EditDiscountDto,
  ): Promise<DiscountInterface> {
    const { reference, ...data } = discountData;
    return await this.discountModel.findOneAndUpdate(
      { _id: reference.refId },
      data,
      {
        new: true,
      },
    );
  }
}
