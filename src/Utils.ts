import { SortType } from "./App";

export function sortByField(sortField: SortType, itemsToSort: string[]) {
  if (sortField) {
    itemsToSort.sort((a, b) => {
      switch (sortField) {
        case SortType.ABC:
          return a.localeCompare(b);

        case SortType.LENGTH:
          return a.length - b.length;

        default:
          return 0;
      }
    });
  }
}
