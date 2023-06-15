import { useState, useEffect } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';

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

export function App() {
  const [reorderOptions, setReorderOptions] = useState<ReorderOptions>({
    isReversed: false,
    sortType: SortType.NONE,
  });

  const { sortType, isReversed } = reorderOptions;

  const reset = () => {
    setReorderOptions({
      isReversed: false,
      sortType: SortType.NONE,
    });
  };

  useEffect(() => {
    return () => {
      reset();
    };
  }, []);

  const sortAlphabetically = () => {
    setReorderOptions({
      isReversed: false,
      sortType: SortType.ALPHABET,
    });
  };

  const sortByLength = () => {
    setReorderOptions({
      isReversed: false,
      sortType: SortType.LENGTH,
    });
  };

  const reverse = () => {
    setReorderOptions((prevState) => ({
      ...prevState,
      isReversed: !prevState.isReversed,
    }));
  };

  const getReorderedGoods = (): string[] => {
    let visibleGoods = [...goodsFromServer];

    switch (sortType) {
      case SortType.ALPHABET:
        visibleGoods.sort((a, b) => a.localeCompare(b));
        break;

      case SortType.LENGTH:
        visibleGoods.sort((a, b) => a.length - b.length);
        break;

      default:
        break;
    }

    if (isReversed) {
      visibleGoods = visibleGoods.reverse();
    }

    return visibleGoods;
  };

  const visibleGoods = getReorderedGoods();
  const isResetButtonVisible = sortType !== SortType.NONE || isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn(
            'button',
            'is-info',
            {
              'is-light': sortType !== SortType.ALPHABET,
            },
          )}
          onClick={sortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn(
            'button',
            'is-success',
            {
              'is-light': sortType !== SortType.LENGTH,
            },
          )}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn(
            'button',
            'is-warning',
            {
              'is-light': !isReversed,
            },
          )}
          onClick={reverse}
        >
          Reverse
        </button>

        {isResetButtonVisible && (
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
        {visibleGoods.map((good) => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
}
