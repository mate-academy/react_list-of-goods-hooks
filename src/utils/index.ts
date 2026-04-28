import { SortType } from '../types/sort';

export function getFilteredGoods(
  goods: string[],
  field: SortType | null,
  sortOrder: boolean,
): string[] {
  const cloneGoods = [...goods];

  if (field) {
    switch (field) {
      case SortType.Alphabet:
        cloneGoods.sort((a, b) => a.localeCompare(b));
        break;

      case SortType.Length:
        cloneGoods.sort((a, b) => a.length - b.length);
        break;
    }
  }

  if (sortOrder) {
    cloneGoods.reverse();
  }

  return cloneGoods;
}
