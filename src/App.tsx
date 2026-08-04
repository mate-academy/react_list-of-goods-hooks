import React, { useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

export enum SortType {
  DEFAULT = '',
  ALPHABET = 'alphabet',
  LENGTH = 'length',
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
  const [sortType, setSortType] = useState<SortType>(SortType.DEFAULT);
  const [isReversed, setIsReversed] = useState<boolean>(false);

  const visibleGoods = useMemo(() => {
    const goods = [...goodsFromServer];

    switch (sortType) {
      case SortType.ALPHABET:
        goods.sort((a, b) => a.localeCompare(b));
        break;

      case SortType.LENGTH:
        goods.sort((a, b) => a.length - b.length);
        break;
      case SortType.DEFAULT:
      default:
        break;
    }

    if (isReversed) {
      goods.reverse();
    }

    return goods;
  }, [sortType, isReversed]);

  const isResetVisible = sortType !== SortType.DEFAULT || isReversed;

  const handleReset = () => {
    setSortType(SortType.DEFAULT);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${
            sortType !== SortType.ALPHABET ? 'is-light' : ''
          }`}
          onClick={() => setSortType(SortType.ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${
            sortType !== SortType.LENGTH ? 'is-light' : ''
          }`}
          onClick={() => setSortType(SortType.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${!isReversed ? 'is-light' : ''}`}
          onClick={() => setIsReversed(prev => !prev)}
        >
          Reverse
        </button>

        {isResetVisible && (
          <button
            type="button"
            className="button is-danger"
            onClick={handleReset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
