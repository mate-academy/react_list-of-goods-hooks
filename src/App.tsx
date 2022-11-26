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
  NONE = 'NONE',
  ALPHABET = 'ALPHABET',
  LENGTH = 'LENGTH',
}

export const App: React.FC = () => {
  const [isReversed, setReverse] = useState(false);
  const [sortType, setSortType] = useState(SortType.NONE);

  const getReorderedGoods = (
    goods: string[],
    type: SortType,
    reversed: boolean,
  ) => {
    const visibleGoods = [...goods];

    visibleGoods.sort((a, b) => {
      switch (type) {
        case 'ALPHABET':
          return a.localeCompare(b);

        case 'LENGTH':
          return a.length - b.length;

        default:
          return 0;
      }
    });

    return reversed ? visibleGoods.reverse() : visibleGoods;
  };

  const visibleGoods = getReorderedGoods(goodsFromServer, sortType, isReversed);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortType(SortType.ALPHABET)}
          type="button"
          className={classNames(
            'button',
            'is-info',
            { 'is-light': sortType !== 'ALPHABET' },
          )}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortType(SortType.LENGTH)}
          type="button"
          className={classNames(
            'button',
            'is-success',
            { 'is-light': sortType !== 'LENGTH' },
          )}
        >
          Sort by length
        </button>

        <button
          onClick={() => setReverse(curr => !curr)}
          type="button"
          className={classNames(
            'button',
            'is-warning',
            { 'is-light': !isReversed },
          )}

        >
          Reverse
        </button>

        {(sortType === 'NONE' && !isReversed)
          || (
            <button
              onClick={() => {
                setSortType(SortType.NONE);
                setReverse(false);
              }}
              type="button"
              className="button is-danger is-light"
            >
              Reset
            </button>
          )}
      </div>

      <ul>
        {visibleGoods.map(item => (
          <li data-cy="Good" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
