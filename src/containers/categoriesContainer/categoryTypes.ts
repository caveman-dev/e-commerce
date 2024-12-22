import { GenericKeyValue, LabelValue } from '../../types/commonTypes';

export interface CategoryFormValues extends CategoryMainTypes {
    topLevelCategory?:LabelValue | null ;
    secondLevelCategory?: LabelValue | null;
}

export enum CategoryTypes {
    TOP_LEVEL_CATGEORY = 'TOP LEVEL CATGEORY',
    SECOND_LEVEL_CATGEORY = 'SECOND LEVEL CATGEORY',
    THIRD_LEVEL_CATGEORY = 'THIRD LEVEL CATGEORY',
}

export interface CategoryDto {
    id: number;
    name: string;
    level: number;
    children?: (null)[] | null;
  }

export interface CategoryMainTypes {
    name: string;
    level: GenericKeyValue<CategoryTypes, number> | number | null;
  }

export interface CategoryUi extends CategoryMainTypes {
    topLevelCategory?: null | CategoryDto ;
    secondLevelCategory?:null | CategoryDto;
  }
