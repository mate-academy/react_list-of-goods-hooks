import 'bulma/css/bulma.css';
import './App.scss';
import classNames from 'classnames';
import { useState } from 'react';

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
  DEFAULT = 'default',
  ALPHABET = 'alphabet',
  LENGTH = 'length',
}

function setSort(
  goods: string[],
  sortBy: SortType,
  isReversed: boolean = false,
) {
  const copyGoods = [...goods];

  if (sortBy) {
    switch (sortBy) {
      case SortType.ALPHABET:
        copyGoods.sort((goodOne, goodTwo) => {
          return goodOne.localeCompare(goodTwo);
        });
        break;
      case SortType.LENGTH:
        copyGoods.sort((goodOne, goodTwo) => {
          return goodOne.length - goodTwo.length;
        });
    }
  }

  return isReversed ? copyGoods.toReversed() : copyGoods;
}

export const App = () => {
  const [sortBy, setSortBy] = useState<SortType>(SortType.DEFAULT);
  const [isReversed, setIsReversed] = useState<boolean>(false);

  const goods = setSort(goodsFromServer, sortBy, isReversed);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => setSortBy(SortType.ALPHABET)}
          className={classNames('button', 'is-info', {
            'is-light': sortBy !== SortType.ALPHABET,
          })}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={() => setSortBy(SortType.LENGTH)}
          className={classNames('button', 'is-success', {
            'is-light': sortBy !== SortType.LENGTH,
          })}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={() =>
            isReversed ? setIsReversed(false) : setIsReversed(true)
          }
          className={classNames('button', 'is-warning', {
            'is-light': !isReversed,
          })}
        >
          Reverse
        </button>

        {(isReversed || sortBy !== SortType.DEFAULT) && (
          <button
            type="button"
            onClick={() => {
              setIsReversed(false);
              setSortBy(SortType.DEFAULT);
            }}
            className="button is-danger is-light"
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
