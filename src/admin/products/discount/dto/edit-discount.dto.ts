export class EditDiscountDto {
  id: string;
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
  /**
  Discount reference
  @example "date"
  */
  reference: { refId: string; refType: string };
}
