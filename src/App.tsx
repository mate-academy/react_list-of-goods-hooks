import React, { useMemo, useState } from 'react';
import cn from 'classnames';
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
  None = 'none',
  Alphabet = 'alphabet',
  Length = 'length',
}

export const App: React.FC = () => {
  const [sortType, setSortType] = useState<SortType>(SortType.None);
  const [reversed, setReversed] = useState(false);

  const goods = useMemo(() => {
    const result = [...goodsFromServer];

    if (sortType === SortType.Alphabet) {
      result.sort((a: string, b: string) => a.localeCompare(b));
    }

    if (sortType === SortType.Length) {
      result.sort((a: string, b: string) => a.length - b.length);
    }

    if (reversed) {
      result.reverse();
    }

    return result;
  }, [reversed, sortType]);

  const isDefaultOrder = sortType === SortType.None && !reversed;

  const sortByAlphabetically = (): void => setSortType(SortType.Alphabet);
  const sortByLength = (): void => setSortType(SortType.Length);
  const reverseGoods = (): void => setReversed(prev => !prev);
  const resetGoods = (): void => {
    setSortType(SortType.None);
    setReversed(false);
  };

  const isAlphabetActive = sortType === SortType.Alphabet;
  const isLengthActive = sortType === SortType.Length;
  const isReverseActive = reversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', { 'is-light': !isAlphabetActive })}
          onClick={sortByAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', { 'is-light': !isLengthActive })}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', { 'is-light': !isReverseActive })}
          onClick={reverseGoods}
        >
          Reverse
        </button>

        {!isDefaultOrder && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={resetGoods}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map((good: string) => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
