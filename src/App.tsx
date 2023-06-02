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
  none,
  alphabet,
  lenght,
}

function getReorderedGoods(
  goods: string[],
  sortType: SortType,
  isReversed: boolean,
) {
  const copyOfGoods = [...goods];

  copyOfGoods.sort((a, b) => {
    switch (sortType) {
      case SortType.alphabet:
        return a.localeCompare(b);
      case SortType.lenght:
        return a.length - b.length;
      default:
        return 0;
    }
  });

  if (isReversed) {
    copyOfGoods.reverse();
  }

  return copyOfGoods;
}

export const App: React.FC = () => {
  const [isReversed, setReversed] = useState(false);
  const [sortType, setSortType] = useState(SortType.none);

  const reorderedGoods = getReorderedGoods(
    goodsFromServer,
    sortType,
    isReversed,
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames(
            'button is-info',
            { 'is-light': sortType !== SortType.alphabet },
          )}
          onClick={() => setSortType(SortType.alphabet)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames(
            'button is-success',
            { 'is-light': sortType !== SortType.lenght },
          )}
          onClick={() => setSortType(SortType.lenght)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames(
            'button is-warning',
            { 'is-light': !isReversed },
          )}
          onClick={() => setReversed(r => !r)}
        >
          Reverse
        </button>

        {(isReversed || sortType !== SortType.none) ? (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortType(SortType.none);
              setReversed(false);
            }}
          >
            Reset
          </button>
        ) : null}
      </div>

      <ul>
        {reorderedGoods.map(good => (
          <li
            data-cy="Good"
            key={good}
          >
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
