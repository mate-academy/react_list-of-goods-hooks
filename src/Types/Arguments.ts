import { SortOptions } from './SortOptions';

export interface Args {
  name: string;
  sortField: SortOptions;
  currentValue: SortOptions;
  sortBy: React.Dispatch<React.SetStateAction<SortOptions>>;
  isReversed: boolean;
  reverse: React.Dispatch<React.SetStateAction<boolean>>;
}
