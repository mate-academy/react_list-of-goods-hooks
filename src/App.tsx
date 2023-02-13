import { useState } from 'react';
import 'bulma/css/bulma.css';
import cn from 'classnames';
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
  sortType: SortType;
  isReversed: boolean;
};

export function getReorderedGoods(
  goods: string[],
  { sortType, isReversed }: ReorderOptions,
) {
  const visibleGoods = [...goods];

  visibleGoods.sort((good1, good2) => {
    switch (sortType) {
      case SortType.ALPHABET:
        return good1.localeCompare(good2);

      case SortType.LENGTH:
        return good1.length - good2.length;

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
  const defaultReoderOptions = {
    sortType: SortType.NONE,
    isReversed: false,
  };

  const [reorderOptions, setReorderOptions] = useState(defaultReoderOptions);

  const reoderedGoods = getReorderedGoods(goodsFromServer, reorderOptions);

  const sortAlphabetically = () => {
    setReorderOptions((state) => ({
      ...state,
      sortType: SortType.ALPHABET,
    }));
  };

  const sortByLength = () => {
    setReorderOptions((state) => ({
      ...state,
      sortType: SortType.LENGTH,
    }));
  };

  const reverse = () => {
    setReorderOptions((state) => ({
      ...state,
      isReversed: !state.isReversed,
    }));
  };

  const reset = () => {
    setReorderOptions(defaultReoderOptions);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': reorderOptions.sortType !== SortType.ALPHABET,
          })}
          onClick={sortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': reorderOptions.sortType !== SortType.LENGTH,
          })}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': !reorderOptions.isReversed,
          })}
          onClick={reverse}
        >
          Reverse
        </button>

        {(reorderOptions.sortType !== SortType.NONE
        || reorderOptions.isReversed) && (
          <button
            type="button"
            className="
              button
              is-danger
              is-light
            "
            onClick={reset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {reoderedGoods.map((good) => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
