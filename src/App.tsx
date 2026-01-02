import React, { useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

export const goodsFromServer = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

enum SortType {
  Default = 'default',
  Alphabet = 'alphabet',
  Length = 'length',
}

type Good = { id: number; name: string };

export const App: React.FC = () => {
  const initialGoods: Good[] = goodsFromServer.map((name, i) => ({
    id: i + 1,
    name,
  }));
  const [activeSort, setActiveSort] = useState<SortType>(SortType.Default); // choose default enum member
  const [minLengthFilter, setMinLengthFilter] = useState<number | ''>('');
  const [isReversed, setIsReversed] = useState(false);
  const visibleGoods = useMemo(() => {
    let goods = initialGoods
      .filter(g => g.name.length >= (minLengthFilter || 0))
      .sort((a, b) => {
        if (activeSort === SortType.Alphabet) {
          return a.name.localeCompare(b.name);
        }

        if (activeSort === SortType.Length) {
          return a.name.length - b.name.length || a.name.localeCompare(b.name);
        }

        return 0;
      });

    if (isReversed) {
      goods = goods.slice().reverse();
    }

    return goods;
  }, [initialGoods, isReversed, minLengthFilter, activeSort]);

  function handleSortAlphabet() {
    setActiveSort(SortType.Alphabet);
  }

  function handleSortLength() {
    setActiveSort(SortType.Length);
  }

  function handleReverse() {
    setIsReversed(prev => !prev);
  }

  function handleReset() {
    setActiveSort(SortType.Default);
    setMinLengthFilter('');
    setIsReversed(false);
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info is-light${activeSort === SortType.Alphabet ? ' is-active' : ''}`}
          onClick={handleSortAlphabet}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success is-light${activeSort === SortType.Length ? ' is-active' : ''}`}
          onClick={handleSortLength}
        >
          Sort by length
        </button>

        <input
          type="number"
          min={0}
          placeholder="Min length"
          value={minLengthFilter}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setMinLengthFilter(
              e.currentTarget.value === '' ? '' : Number(e.currentTarget.value),
            )
          }
        />

        <button
          type="button"
          className={`button is-warning is-light${isReversed ? ' is-active' : ''}`}
          onClick={handleReverse}
        >
          Reverse
        </button>

        <button
          type="button"
          className="button is-danger is-light"
          onClick={handleReset}
        >
          Reset
        </button>
      </div>

      <ul>
        {visibleGoods.map((g: Good) => (
          <li key={g.id} data-cy="Good">
            {g.name}
          </li>
        ))}
      </ul>
    </div>
  );
};
