// export enum SortType { '', 'name', 'length' }

export enum SortType {
  Name = 'name',
  Length = 'length',
  None = '',
}

export interface SortingParams {
  sortField: SortType;
  isReversed: boolean
}
