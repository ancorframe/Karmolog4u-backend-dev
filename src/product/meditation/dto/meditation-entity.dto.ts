import { Description, Name, STATUS } from '../schemas/meditation.schema';
import { Types } from 'mongoose';

export class MeditationEntity {
  /**
  User's id
  @example "9092384823"
  */
  _id: Types.ObjectId;

  /**
  User's id
  @example "9092384823"
  */
  category: string;

  /**
  User's id
  @example "9092384823"
  */
  name: Name;

  /**
  User's id
  @example "9092384823"
  */
  description: Description;

  /**
  User's id
  @example "9092384823"
  */
  video: string;

  /**
  User's id
  @example "9092384823"
  */
  cover: string;

  /**
  User's id
  @example "9092384823"
  */
  price: string;

  /**
  User's id
  @example "9092384823"
  */
  isWaiting: boolean;

  /**
  User's id
  @example "9092384823"
  */
  toDelete: boolean;
  /**
  User's id
  @example "9092384823"
  */
  status: STATUS;
}
