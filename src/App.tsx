import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

enum SortType {
  Alphabetic = 'alphabetic',
  Length = 'length',
  Reverse = 'reverse',
  ReverseAlphabetic = 'reverse-alphabetic',
  ReverseLength = 'reverse-length',
}

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

export const App: React.FC = () => {
  const [goodsCopy, setGoodsCopy] = useState([...goodsFromServer]);
  const [lastChange, setLastChange] = useState<SortType | ''>('');

  const handleSortAlphabetically = () => {
    const copy = [...goodsFromServer].sort();

    if (
      lastChange === SortType.Reverse ||
      lastChange === SortType.ReverseAlphabetic ||
      lastChange === SortType.ReverseLength
    ) {
      copy.reverse();
      setLastChange(SortType.ReverseAlphabetic);
    } else {
      setLastChange(SortType.Alphabetic);
    }

    setGoodsCopy(copy);
  };

  const handleSortByLength = () => {
    const copy = [...goodsFromServer].sort((a, b) => a.length - b.length);

    if (
      lastChange === SortType.Reverse ||
      lastChange === SortType.ReverseAlphabetic ||
      lastChange === SortType.ReverseLength
    ) {
      copy.reverse();
      setLastChange(SortType.ReverseLength);
    } else {
      setLastChange(SortType.Length);
    }

    setGoodsCopy(copy);
  };

  const handleReset = () => {
    setGoodsCopy([...goodsFromServer]);
    setLastChange('');
  };

  const handleReverse = () => {
    const copy = [...goodsCopy].reverse();

    setGoodsCopy(copy);

    if (lastChange === SortType.Alphabetic) {
      setLastChange(SortType.ReverseAlphabetic);
    } else if (lastChange === SortType.ReverseAlphabetic) {
      setLastChange(SortType.Alphabetic);
    } else if (lastChange === SortType.Length) {
      setLastChange(SortType.ReverseLength);
    } else if (lastChange === SortType.ReverseLength) {
      setLastChange(SortType.Length);
    } else if (lastChange === '') {
      setLastChange(SortType.Reverse);
    } else if (lastChange === SortType.Reverse) {
      setLastChange('');
    }
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${
            lastChange === SortType.Alphabetic ||
            lastChange === SortType.ReverseAlphabetic
              ? ''
              : 'is-light'
          }`}
          onClick={handleSortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${
            lastChange === SortType.Length ||
            lastChange === SortType.ReverseLength
              ? ''
              : 'is-light'
          }`}
          onClick={handleSortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${
            lastChange === SortType.Reverse ||
            lastChange === SortType.ReverseAlphabetic ||
            lastChange === SortType.ReverseLength
              ? ''
              : 'is-light'
          }`}
          onClick={handleReverse}
        >
          Reverse
        </button>

        {(lastChange === SortType.Reverse ||
          lastChange === SortType.ReverseAlphabetic ||
          lastChange === SortType.Alphabetic ||
          lastChange === SortType.Length ||
          lastChange === SortType.ReverseLength) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleReset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        <ul>
          {goodsCopy.map(good => {
            return (
              <li data-cy="Good" key={good}>
                {good}
              </li>
            );
          })}
        </ul>
      </ul>
    </div>
  );
};
