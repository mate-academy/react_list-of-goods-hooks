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

    visibleGoods.sort((firstItem, secondItem) => {
      switch (sortType) {
        case SortType.ALPHABET:
          return firstItem.localeCompare(secondItem);

        case SortType.LENGTH:
          return firstItem.length - secondItem.length;

        default:
          return 0;
      }
    });

    if (isReversed) {
      visibleGoods.reverse();
    }

    return visibleGoods;
  };

  const [sortType, setSortType] = useState(SortType.NONE);
  const [isReversed, setReverse] = useState(false);
  const isHideReset = isReversed || sortType !== SortType.NONE;

  const sortBy = (sortTypeKey: SortType) => {
    setSortType(() => sortTypeKey);
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
          className={`button is-info ${!(sortType === SortType.ALPHABET) ? 'is-light' : ''}`}
          onClick={() => sortBy(SortType.ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${!(sortType === SortType.LENGTH) ? 'is-light' : ''}`}
          onClick={() => sortBy(SortType.LENGTH)}
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

        {isHideReset && (
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
