export enum SortType {
  ASC,
  LENGTH,
  NONE,
}

export interface SortOption {
  id: number;
  type: SortType;
  title: string;
  cssClass?: string;
}

export const DEFAULT_SORT_TYPE = SortType.NONE;
