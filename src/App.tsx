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
  ByLength = 'length',
  ByAlphabet = 'alphabet',
  Default = '',
}

function sortBy(sortType: SortType, isReversed: boolean): string[] {
  const goods = [...goodsFromServer];

  if (sortType) {
    switch (sortType) {
      case SortType.ByAlphabet:
        goods.sort((a, b) => a.localeCompare(b));
        break;

      case SortType.ByLength:
        goods.sort((a, b) => a.length - b.length);
        break;

      default:
        break;
    }
  }

  return isReversed ? goods.reverse() : goods;
}

export const App: React.FC = () => {
  const [isReversed, setIsReversed] = useState(false);
  const [sortType, setSortType] = useState(SortType.Default);
  const shouldShowResetButton = sortType || isReversed;

  const preparedGoods: string[] = sortBy(sortType, isReversed);

  const resetAllSort = (): void => {
    setIsReversed(false);
    setSortType(SortType.Default);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => {
            setSortType(SortType.ByAlphabet);
            sortBy(SortType.ByAlphabet, isReversed);
          }}
          type="button"
          className={
            classnames('button',
              'is-info',
              { 'is-light': sortType !== SortType.ByAlphabet })
          }
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => {
            setSortType(SortType.ByLength);
            sortBy(SortType.ByLength, isReversed);
          }}
          type="button"
          className={
            classnames('button',
              'is-success',
              { 'is-light': sortType !== SortType.ByLength })
          }
        >
          Sort by length
        </button>

        <button
          onClick={() => {
            setIsReversed((prevState) => !prevState);
          }}
          type="button"
          className={
            classnames(
              'button',
              'is-warning',
              { 'is-light': !isReversed },
            )
          }
        >
          Reverse
        </button>

        {shouldShowResetButton && (
          <button
            onClick={resetAllSort}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {preparedGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
