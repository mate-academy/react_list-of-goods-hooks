import React, { useState } from 'react';
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
  sortType: SortType;
  isReversed: boolean;
};

export const App: React.FC = () => {
  const [ReorderOptions, setReorderOptions] = useState<ReorderOptions>({
    sortType: SortType.NONE,
    isReversed: false,
  });

  const getReorderedGoods = (goods: string[]) => {
    const visibleGoods = [...goods];

    if (ReorderOptions.sortType === SortType.ALPHABET) {
      visibleGoods.sort((a, b) => a.localeCompare(b));
    } else if (ReorderOptions.sortType === SortType.LENGTH) {
      visibleGoods.sort((a, b) => a.length - b.length);
    }

    if (ReorderOptions.isReversed) {
      visibleGoods.reverse();
    }

    return visibleGoods;
  };

  const setSortAlphabetically = () => {
    setReorderOptions(prevState => ({
      ...prevState,
      sortType: SortType.ALPHABET,
    }));
  };

  const setSortByLength = () => {
    setReorderOptions(prevState => ({
      ...prevState,
      sortType: SortType.LENGTH,
    }));
  };

  const toggleReverse = () => {
    setReorderOptions(prevState => ({
      ...prevState,
      isReversed: !prevState.isReversed,
    }));
  };

  const reset = () => {
    setReorderOptions(prevState => ({
      ...prevState,
      sortType: SortType.NONE,
      isReversed: false,
    }));
  };

  const goods = getReorderedGoods(goodsFromServer);
  const { sortType, isReversed } = ReorderOptions;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortType === SortType.ALPHABET ? '' : 'is-light'}`}
          onClick={setSortAlphabetically}
        >
          Sort alphabetically
        </button>
        <button
          type="button"
          className={`button is-success ${sortType === SortType.LENGTH ? '' : 'is-light'}`}
          onClick={setSortByLength}
        >
          Sort by length
        </button>
        <button
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={toggleReverse}
        >
          Reverse
        </button>

        {(sortType !== SortType.NONE || isReversed) && (
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
        {goods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
