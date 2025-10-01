import React from 'react';
import { useState, useMemo } from 'react';
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

enum SortType {
  NONE,
  ALPHABET,
  LENGTH,
}

export const App: React.FC = () => {
  const [sortType, setSortType] = useState(SortType.NONE);
  const [isReversed, setIsReversed] = useState(false);
  const [minLength, setMinLength] = useState<number>(0);

  const originalArr = goodsFromServer;

  const goods = useMemo(() => {
    const result = originalArr.filter(item => item.length >= minLength);

    if (sortType === SortType.ALPHABET) {
      result.sort((a, b) => a.localeCompare(b));
    } else if (sortType === SortType.LENGTH) {
      result.sort((a, b) => a.length - b.length);
    }

    if (isReversed) {
      result.reverse();
    }

    return result;
  }, [sortType, isReversed, minLength, originalArr]);

  const handleSortAlph = () => {
    setSortType(SortType.ALPHABET);
  };

  const handleSortLength = () => {
    setSortType(SortType.LENGTH);
  };

  const handleSortReset = () => {
    setSortType(SortType.NONE);
    setIsReversed(false);
    setMinLength(0);
  };

  const handleReverse = () => {
    setIsReversed(!isReversed);
  };

  const handleMinLengthChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = parseInt(event.target.value, 10);

    setMinLength(isNaN(value) ? 0 : value);
  };

  return (
    <div className="section content">
      <div className="field">
        <label className="label" htmlFor="minLengthInput">
          Filter by minimum length:
        </label>
        <div className="control">
          <input
            id="minLengthInput"
            className="input"
            type="number"
            value={minLength}
            onChange={handleMinLengthChange}
            min="0"
            placeholder="Enter minimum length"
          />
        </div>
      </div>

      <div className="buttons">
        <button
          type="button"
          className={
            sortType === SortType.ALPHABET
              ? 'button is-info'
              : 'button is-info is-light'
          }
          onClick={handleSortAlph}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={
            sortType === SortType.LENGTH
              ? 'button is-success'
              : 'button is-success is-light'
          }
          onClick={handleSortLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={
            isReversed ? 'button is-warning' : 'button is-warning is-light'
          }
          onClick={handleReverse}
        >
          Reverse
        </button>

        {sortType !== SortType.NONE || isReversed === true || minLength > 0 ? (
          <button
            type="button"
            className={'button is-danger is-light'}
            onClick={handleSortReset}
          >
            Reset
          </button>
        ) : null}
      </div>

      <ul>
        {goods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
