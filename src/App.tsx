import 'bulma/css/bulma.css';
import './App.scss';
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
  NONE,
  ALPHABET,
  LENGTH,
}

type ReorderOptions = {
  sortType: SortType,
  isReversed: boolean,
};

export function getReorderedGoods(
  goods: string[],
  { sortType, isReversed }: ReorderOptions,
) {
  const visibleGoods = [...goods];

  if (sortType === SortType.ALPHABET) {
    visibleGoods.sort((a, b) => (a.localeCompare(b)));
  }

  if (sortType === SortType.LENGTH) {
    visibleGoods.sort((a, b) => {
      return a.length - b.length;
    });
  }

  if (isReversed) {
    visibleGoods.reverse();
  }

  return visibleGoods;
}

export const App: React.FC = () => {
  const [isReversed, setIsReversed] = useState<boolean>(false);
  const [sortType, setSortType] = useState<SortType>(SortType.NONE);

  const sortAlphabetically = () => {
    setSortType(SortType.ALPHABET);
    setIsReversed(false);
  };

  const reset = () => {
    setSortType(SortType.NONE);
    setIsReversed(false);
  };

  const sortByLength = () => {
    setSortType(SortType.LENGTH);
    setIsReversed(false);
  };

  const reverseGoods = () => {
    setIsReversed((prevState) => !prevState);
  };

  const visibleGoods = getReorderedGoods(goodsFromServer,
    { sortType, isReversed });
  const isHidden = sortType === SortType.NONE && !isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortType === SortType.ALPHABET ? '' : 'is-light'}`}
          onClick={sortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortType === SortType.LENGTH ? '' : 'is-light'}`}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={reverseGoods}
        >
          Reverse
        </button>

        <button
          type="button"
          className={`button is-danger ${isHidden ? 'hidden-reset-button' : 'is-light'}`}
          onClick={reset}
        >
          Reset
        </button>
      </div>

      <ul>
        {visibleGoods.map((good: string) => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
