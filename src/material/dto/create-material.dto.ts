import { MaterialId } from './material-id';
import { MaterialTransDto } from './material-trans.dto';
export class CreateMaterialDto {
  translations: MaterialTransDto[];
}

export class CreateMaterialResponseDto {
  _id: MaterialId;
  translations: MaterialTransDto[];
  createdAt: string;
  updatedAt: string;
}
