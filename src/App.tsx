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
  NONE = 'NONE',
  ALPHABET = 'APLHABET',
  LENGTH = 'LENGTH',
}

export const App: React.FC = () => {
  const [isReversed, setReversed] = useState<boolean>(false);
  const [sortType, setSortType] = useState<SortType>(SortType.NONE);

  const resetGoodsList = (): void => {
    setSortType(SortType.NONE);
    setReversed(false);
  };

  const orderGoodsList = (): string[] => {
    const orderedList = [...goodsFromServer];

    orderedList.sort((p1, p2) => {
      switch (sortType) {
        case SortType.ALPHABET:
          return p1.localeCompare(p2);
        case SortType.LENGTH:
          return p1.length - p2.length;
        default:
          return 0;
      }
    });

    if (isReversed) {
      return orderedList.reverse();
    }

    return orderedList;
  };

  const visibleGoods = orderGoodsList();

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames(
            'button',
            'is-info',
            { 'is-light': sortType !== SortType.ALPHABET },
          )}
          onClick={() => setSortType(SortType.ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames(
            'button',
            'is-success',
            { 'is-light': sortType !== SortType.LENGTH },
          )}
          onClick={() => setSortType(SortType.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames(
            'button',
            'is-warning',
            { 'is-light': !isReversed },
          )}
          onClick={() => {
            setReversed(reversed => !reversed);
          }}
        >
          Reverse
        </button>
        {(isReversed || sortType !== SortType.NONE) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={resetGoodsList}
          >
            Reset
          </button>
        )}
      </div>

      <ul className="GoodsList">
        {visibleGoods.map(product => (
          <li key={product} data-cy="Good">
            {product}
          </li>
        ))}
      </ul>
    </div>
  );
};
