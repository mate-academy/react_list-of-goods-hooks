import 'bulma/css/bulma.css';
import './App.scss';
import React, { useState } from 'react';
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
  ByLength = 'sort by length',
  ByAlphabet = 'sort by alphabet',
  Default = '',
}

function getSortedGoods(
  goods: string[],
  sortField: SortType,
  isReversed: boolean,
) {
  const sortedGoods = [...goods];

  if (sortField) {
    sortedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortType.ByLength:
          return good1.length - good2.length;

        case SortType.ByAlphabet:
          return good1.localeCompare(good2);

        default:
          return 0;
      }
    });
  }

  return isReversed ? sortedGoods.reverse() : sortedGoods;
}

export const App: React.FC = () => {
  const [sortType, setSortType] = useState(SortType.Default);
  const [isReversed, setIsReversed] = useState(false);

  const goods = getSortedGoods(goodsFromServer, sortType, isReversed);

  const isResetButton = sortType || isReversed;

  const resetAllFiltres = () => {
    setIsReversed(false);
    setSortType(SortType.Default);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classnames(
            'button',
            'is-info',
            { 'is-light': sortType !== SortType.ByAlphabet },
          )}
          onClick={() => setSortType(SortType.ByAlphabet)}

        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classnames(
            'button',
            'is-success',
            { 'is-light': sortType !== SortType.ByLength },
          )}
          onClick={() => setSortType(SortType.ByLength)}
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
          onClick={() => setIsReversed(isSortingReversed => !isSortingReversed)}
        >
          Reverse
        </button>

        {isResetButton
          && (
            <button
              type="button"
              className="button is-danger is-light"
              onClick={resetAllFiltres}
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
