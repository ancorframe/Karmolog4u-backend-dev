import { Role } from 'src/role/role.enum';

export class UserResponseDto {
  /**
  User's first name
  @example "John Johnson"
  */
  fullName: string;

  /**
  User's email
  @example "example@mail.com"
  */
  email: string;

  // /**
  // User's last name
  // @example "Doe"
  // */
  // lastName: string;

  /**
  User's phone number
  @example "+1 1234567890"
  */
  mobPhone: string;

  // /**
  // URL of user's avatar image
  // @example "https://example.com/avatar.png"
  // */
  // avatarUrl: string;

  /**
  User's role(s)
  @example ["admin"]
  */
  role: Role[];

  // /**
  // User's supplied items
  // @example ["item1", "item2", "item3"]
  // */
  // supplies: string[];

  /**
  Indicates if the user is banned
  @example true
  */
  banned: boolean;

  /**
  Indicates if the user is move to delete
  @example true
  */
  toDelete: boolean;

  /**
  Indicates when user is created
  @example true
  */
  createdAt: string;

  /**
  Indicates when user is updated
  @example true
  */
  updatedAt: string;

  /**
  Indicates when user is deleted
  @example true
  */
  expiredAt: Date;
}
