import { SortField, SortProps } from './type';

export function getPreparedGoods(
  products: string[],
  { sortBy, reversed }: SortProps,
) {
  const copy = [...products];

  if (sortBy) {
    copy.sort((a, b) => {
      switch (sortBy) {
        case SortField.Name:
          return a.localeCompare(b);
        case SortField.Length:
          return a.length - b.length;
        default:
          return 0;
      }
    });
  }

  if (reversed) {
    return copy.reverse();
  }

  return copy;
}
