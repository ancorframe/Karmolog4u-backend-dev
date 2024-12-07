export class CreateDiscountDto {
  /**
  Discount
  @example "10"
  */
  discount: number;
  /**
  Discount start date
  @example "date"
  */
  start: Date;
  /**
  Discount end date
  @example "date"
  */
  expiredAt: Date;
  reference: { refId: string; refType: string };
}
