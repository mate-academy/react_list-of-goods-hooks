import { useState } from 'react';
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

export type ReorderOptions = {
  sortType: SortType,
  isReversed: boolean,
};

export function getReorderedGoods(
  goods: string[],
  { sortType, isReversed }: ReorderOptions,
) {
  const visibleGoods = [...goods];

  visibleGoods.sort((item1, item2) => {
    switch (sortType) {
      case (SortType.ALPHABET):
        return item1.localeCompare(item2);

      case (SortType.LENGTH):
        return item1.length - item2.length;

      default:
        return 0;
    }
  });

  if (isReversed) {
    visibleGoods.reverse();
  }

  return visibleGoods;
}

export const App: React.FC = () => {
  const [isReversed, setReverse] = useState(false);
  const [sortType, setSortBy] = useState(SortType.NONE);

  const goods = getReorderedGoods(goodsFromServer, { sortType, isReversed });

  const handleReverse = () => {
    setReverse(!isReversed);
  };

  const handleReset = () => {
    setReverse(false);
    setSortBy(SortType.NONE);
  };

  return (

    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames(
            'button', 'is-info', {
              'is-light': sortType !== SortType.ALPHABET,
            },
          )}
          onClick={() => setSortBy(SortType.ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames(
            'button', 'is-success', {
              'is-light': sortType !== SortType.LENGTH,
            },
          )}
          onClick={() => setSortBy(SortType.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames(
            'button', 'is-warning', {
              'is-light': !isReversed,
            },
          )}
          onClick={handleReverse}
        >
          Reverse
        </button>

        {(sortType !== SortType.NONE
        || isReversed === true)
        && (
          <button
            type="button"
            className="button is-warning is-light"
            onClick={handleReset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods
          .map((item) => <li data-cy="Good" key={item}>{item}</li>)}
      </ul>
    </div>
  );
};
