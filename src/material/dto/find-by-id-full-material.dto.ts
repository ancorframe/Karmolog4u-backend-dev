import { MaterialTransDto } from './material-trans.dto';
import { MaterialId } from './material-id';
export class FindByIdFullMaterialResponseDto {
  _id: MaterialId;
  translations: MaterialTransDto[];
  createdAt: string;
  updatedAt: string;
}
