export type Sort = 'alphabetical' | 'length' | null;

export interface ActionsState {
  sort: Sort;
  reversed: boolean;
}
