import KindsOfSort from '../constances';
import { ISortGoods } from '../interfaces/ISortGoods';

export function sortGoods({
  sortBy,
  setSortBy,
  setReversed,
  setGoods,
  originalGoods,
  reversed,
}: ISortGoods): void {
  switch (sortBy) {
    case KindsOfSort.NO_SORT:
      setReversed(false);
      setGoods(originalGoods);
      setSortBy(KindsOfSort.NO_SORT);
      break;
    case KindsOfSort.ALPHABET: {
      setSortBy(KindsOfSort.ALPHABET);
      const sortedGoods = originalGoods.sort(
        (good1, good2) => good1.localeCompare(good2),
      );

      setGoods(reversed ? sortedGoods.reverse() : sortedGoods);
      break;
    }

    case KindsOfSort.LENGTH: {
      setSortBy(KindsOfSort.LENGTH);
      const sortedGoods = originalGoods.sort(
        (good1, good2) => good1.length - good2.length,
      );

      setGoods(reversed ? [...sortedGoods].reverse() : [...sortedGoods]);
      break;
    }

    default:
      break;
  }
}
