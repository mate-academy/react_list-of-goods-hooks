import { SortType } from '../types/SortType';

export function sortGoods(
  goods: string[],
  sortField: SortType = SortType.Default,
  isReverse = false,
): string[] {
  const visibleGoods: string[] = [...goods];

  if (sortField !== SortType.Default) {
    switch (sortField as SortType) {
      case SortType.ALPHABET:
        visibleGoods.sort((good1, good2) => good1.localeCompare(good2));
        break;
      case SortType.LENGTH:
        visibleGoods.sort((good1, good2) => good1.length - good2.length);
        break;
      default:
        throw new Error('Sort method is unknown!');
    }
  }

  if (isReverse) {
    visibleGoods.reverse();
  }

  return visibleGoods;
}
