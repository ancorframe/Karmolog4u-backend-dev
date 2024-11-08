import { MaterialTransDto } from './material-trans.dto';
import { MaterialId } from './material-id';
export class FindAllMaterialResponseDto {
  _id: MaterialId;
  translations: MaterialTransDto[];
  createdAt: string;
  updatedAt: string;
}
