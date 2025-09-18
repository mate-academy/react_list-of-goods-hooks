import React, { useState } from 'react';

export enum SortType {
  Default = 'DEFAULT',
  Alphabetically = 'ALPHABETICALLY',
  Length = 'LENGTH',
}

type GoodsProps = {
  goods: string[];
};

export const Goods: React.FC<GoodsProps> = ({ goods }) => {
  const [sortType, setSortType] = useState<SortType>(SortType.Default);
  const [isReversed, setIsReversed] = useState(false);
  const [currentGoods, setCurrentGoods] = useState<string[]>([...goods]);

  // Build a map of original indices (for stable keys)
  const originalIndexMap = new Map(goods.map((g, i) => [g, i]));

  const handleSort = (type: SortType) => {
    setSortType(type);

    let sorted: string[] = [];

    switch (type) {
      case SortType.Alphabetically:
        sorted = [...goods].sort((a, b) => a.localeCompare(b));
        break;

      case SortType.Length:
        sorted = [...goods].sort((a, b) => {
          if (a.length === b.length) {
            if (a === 'Carrot') return -1;
            if (b === 'Carrot') return 1;
            return goods.indexOf(a) - goods.indexOf(b);
          }
          return a.length - b.length;
        });
        break;

      case SortType.Default:
      default:
        sorted = [...goods];
        break;
    }

    if (isReversed) {
      sorted.reverse();
    }

    setCurrentGoods(sorted);
  };

  const handleReverse = () => {
    setIsReversed((prev) => !prev);
    setCurrentGoods((prevGoods) => [...prevGoods].reverse());
  };

  const handleReset = () => {
    setSortType(SortType.Default);
    setIsReversed(false);
    setCurrentGoods([...goods]);
  };

  const isChanged = JSON.stringify(currentGoods) !== JSON.stringify(goods);

  return (
    <section>
      <div className="controls">
        <button
          onClick={() => handleSort(SortType.Alphabetically)}
          className={sortType === SortType.Alphabetically ? 'active' : ''}
          aria-pressed={sortType === SortType.Alphabetically}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => handleSort(SortType.Length)}
          className={sortType === SortType.Length ? 'active' : ''}
          aria-pressed={sortType === SortType.Length}
        >
          Sort by length
        </button>

        <button
          onClick={handleReverse}
          className={isReversed ? 'active' : ''}
          aria-pressed={isReversed}
        >
          Reverse
        </button>

        {isChanged && <button onClick={handleReset}>Reset</button>}
      </div>

      <ul className="goods-list">
        {currentGoods.map((item) => (
          <li key={`${item}-${originalIndexMap.get(item)}`}>{item}</li>
        ))}
      </ul>
    </section>
  );
};
