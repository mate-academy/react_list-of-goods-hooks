import React, { useState, useMemo } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

export const goodsFromServer: string[] = [
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

export enum SortType {
  Default,
  Alphabet,
  Length,
}

export const App: React.FC = () => {
  const [sortType, setSortType] = useState<SortType>(SortType.Default);
  const [reversed, setReversed] = useState<boolean>(false);

  const goods = useMemo(() => {
    const sorted = [...goodsFromServer];

    switch (sortType) {
      case SortType.Alphabet:
        sorted.sort((a, b) => a.localeCompare(b));
        break;
      case SortType.Length:
        sorted.sort((a, b) => a.length - b.length);
        break;
      default:
        break;
    }

    if (reversed) {
      sorted.reverse();
    }

    return sorted;
  }, [sortType, reversed]);
  const sortAlphabet = () => setSortType(SortType.Alphabet);
  const sortByLength = () => setSortType(SortType.Length);
  const toggleReverse = () => setReversed(prev => !prev);
  const resetList = () => {
    setSortType(SortType.Default);
    setReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortType === SortType.Alphabet ? '' : 'is-light'}`}
          onClick={sortAlphabet}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortType === SortType.Length ? '' : 'is-light'}`}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${reversed ? '' : 'is-light'}`}
          onClick={toggleReverse}
        >
          Reverse
        </button>

        {(sortType !== SortType.Default || reversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={resetList}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
