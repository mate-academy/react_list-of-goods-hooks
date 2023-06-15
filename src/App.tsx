import { FC, useState } from 'react';
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
  NONE,
  ALPHABET,
  LENGTH,
}

const getReorderedGoods = (
  goods: string[],
  sortBy: SortType,
  reversed: boolean,
) => {
  const visibleGoods = [...goods];

  visibleGoods.sort((a, b) => {
    switch (sortBy) {
      case SortType.ALPHABET:
        return a.localeCompare(b);

      case SortType.LENGTH:
        return a.length - b.length;

      default:
        return 0;
    }
  });
  if (reversed) {
    visibleGoods.reverse();
  }

  return visibleGoods;
};

export const App: FC = () => {
  const [isReversed, setReverse] = useState(false);
  const [sortType, setSortType] = useState(SortType.NONE);

  const reset = () => {
    setSortType(SortType.NONE);
    setReverse(false);
  };

  const reorderedGoods = getReorderedGoods(
    goodsFromServer,
    sortType,
    isReversed,
  );

  const isChanged = sortType !== SortType.NONE || isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames(
            'button',
            'is-info',
            {
              'is-light': sortType !== SortType.ALPHABET,
            },
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
            {
              'is-light': sortType !== SortType.LENGTH,
            },
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
            {
              'is-light': !isReversed,
            },
          )}
          onClick={() => setReverse(!isReversed)}
        >
          Reverse
        </button>

        {(isChanged) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={reset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        <ul>
          {reorderedGoods.map(good => (
            <li key={good} data-cy="Good">
              {good}
            </li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
