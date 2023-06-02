import { FC, useState } from 'react';
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

type ReorderOptions = {
  sortType: SortType,
  isReversed: boolean,
};

export const App: FC = () => {
  const getReorderedGoods = (
    goods: string[],
    { sortType, isReversed }: ReorderOptions,
  ) => {
    const visibleGoods = [...goods];

    if (sortType === 1) {
      visibleGoods.sort();
    }

    if (sortType === 2) {
      visibleGoods.sort((firstItem, secondItem) => {
        return firstItem.length - secondItem.length;
      });
    }

    if (isReversed) {
      visibleGoods.reverse();
    }

    return visibleGoods;
  };

  const [sortType, setSortType] = useState(SortType.NONE);
  const [isReversed, setReverse] = useState(false);

  const sortByAlph = () => {
    setSortType(() => SortType.ALPHABET);
  };

  const sortByLength = () => {
    setSortType(() => SortType.LENGTH);
  };

  const reverse = () => {
    setReverse(() => !isReversed);
  };

  const reset = () => {
    setReverse(() => false);
    setSortType(() => SortType.NONE);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${!(sortType === 1) ? 'is-light' : ''}`}
          onClick={sortByAlph}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${!(sortType === 2) ? 'is-light' : ''}`}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${!(isReversed) ? 'is-light' : ''}`}
          onClick={reverse}
        >
          Reverse
        </button>

        {!(!isReversed && !sortType) && (
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
        {getReorderedGoods(
          goodsFromServer,
          { sortType, isReversed },
        ).map((item) => (
          <li data-cy="Good" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
