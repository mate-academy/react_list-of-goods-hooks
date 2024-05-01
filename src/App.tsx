import React, { useState } from 'react';
import classNames from 'classnames';

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
  Default,
  Alphabet,
  Length,
}

interface Sort {
  sortType: SortType;
  reversed: boolean;
}

function prepareGoodsForOutput(
  goods: string[],
  { sortType, reversed }: Sort,
): string[] {
  const preparedGoods = [...goods];

  switch (sortType) {
    case SortType.Alphabet:
      preparedGoods.sort((good1, good2) => good1.localeCompare(good2));
      break;

    case SortType.Length:
      preparedGoods.sort((good1, good2) => good1.length - good2.length);
      break;

    default:
      break;
  }

  if (reversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortType, setSortType] = useState(SortType.Default);
  const [reversed, setReversed] = useState(false);

  const handleReset = () => {
    setSortType(SortType.Default);
    setReversed(false);
  };

  const handleReverse = () => {
    if (reversed) {
      setReversed(false);
    } else {
      setReversed(true);
    }
  };

  const preparedGoods = prepareGoodsForOutput(goodsFromServer, {
    sortType,
    reversed,
  });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button', 'is-info', {
            'is-light': sortType !== SortType.Alphabet,
          })}
          onClick={() => setSortType(SortType.Alphabet)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button', 'is-success', {
            'is-light': sortType !== SortType.Length,
          })}
          onClick={() => setSortType(SortType.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button', 'is-warning', {
            'is-light': !reversed,
          })}
          onClick={handleReverse}
        >
          Reverse
        </button>

        {(sortType !== SortType.Default || reversed) && (
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
          {preparedGoods.map(good => (
            <li key={good} data-cy="Good">
              {good}
            </li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
