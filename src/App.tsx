import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import classNames from 'classnames';

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
  NONE,
  ALPHABET,
  LENGTH,
}

export const App: React.FC = () => {
  const [sortType, setSortType] = useState<SortType>(SortType.NONE);
  const [isReversed, setReversed] = useState<boolean>(false);

  const getReorderedGoods = (
    goods: string[],
  ) => {
    const visibleGoods = [...goods];

    visibleGoods.sort((product1, product2) => {
      switch (sortType) {
        case SortType.ALPHABET:
          return product1.localeCompare(product2);
        case SortType.LENGTH:
          return product1.length - product2.length;
        default:
          return 0;
      }
    });

    if (isReversed) {
      return visibleGoods.reverse();
    }

    return visibleGoods;
  };

  const sortedList = getReorderedGoods(
    goodsFromServer,
  );

  const resetCondition = sortType !== SortType.NONE
    || isReversed === true;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button is-info', {
            'is-light': sortType !== SortType.ALPHABET,
          })}
          onClick={() => setSortType(SortType.ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button is-success', {
            'is-light': sortType !== SortType.LENGTH,
          })}
          onClick={() => setSortType(SortType.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button is-warning', {
            'is-light': isReversed !== true,
          })}
          onClick={() => setReversed(!isReversed)}
        >
          Reverse
        </button>

        {
          resetCondition && (
            <button
              type="button"
              className="button is-danger is-light"
              onClick={() => {
                setSortType(SortType.NONE);
                setReversed(false);
              }}
            >
              Reset
            </button>
          )
        }
      </div>
      <ul>
        {sortedList.map(product => (
          <li data-cy="Good" key={product}>
            {product}
          </li>
        ))}
      </ul>
    </div>
  );
};
