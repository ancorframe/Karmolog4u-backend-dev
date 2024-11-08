import { MaterialId } from './material-id';
import { MaterialTransDto } from './material-trans.dto';
export class UpdateMaterialDto {
  _id: MaterialId;
  translations: MaterialTransDto;
}

export class UpdateMaterialResponseDto {
  _id: MaterialId;
  translations: MaterialTransDto[];
  createdAt: string;
  updatedAt: string;
}
