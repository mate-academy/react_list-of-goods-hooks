import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import classnames from 'classnames';

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
  Alphabet = 'alphabet',
  Length = 'length',
  Default = '',
}

interface SortParams {
  sortType: string,
  isReversed: boolean,
}

function getPreparedGoods(
  goods: string[],
  { sortType, isReversed }: SortParams,
) {
  const preparedGoods = [...goods];

  if (sortType) {
    preparedGoods.sort((good1, good2) => {
      switch (sortType) {
        case (SortType.Alphabet):
          return good1.localeCompare(good2);

        case (SortType.Length):
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortType, setSortType] = useState(SortType.Default);
  const [isReversed, setIsReversed] = useState(false);
  const isResetButtonVisible = sortType || isReversed;
  const goods = getPreparedGoods(goodsFromServer, { sortType, isReversed });

  function handleResetClicked() {
    setSortType(SortType.Default);
    setIsReversed(false);
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classnames(
            'button',
            'is-info',
            { 'is-light': sortType !== SortType.Alphabet },
          )}
          onClick={() => setSortType(SortType.Alphabet)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classnames(
            'button',
            'is-success',
            { 'is-light': sortType !== SortType.Length },
          )}
          onClick={() => setSortType(SortType.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classnames(
            'button',
            'is-warning',
            { 'is-light': !isReversed },
          )}
          onClick={() => {
            setIsReversed(currentReversed => !currentReversed);
          }}
        >
          Reverse
        </button>

        {isResetButtonVisible && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleResetClicked}
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
