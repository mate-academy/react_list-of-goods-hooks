export enum SortField {
  Name = 'name',
  Length = 'alphabet',
  Default = '',
}

export type SortProps = {
  sortBy: SortField;
  reversed: boolean;
};
