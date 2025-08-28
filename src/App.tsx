import { useState, useMemo } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

export const goodsFromServer: string[] = [
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

export enum SortType {
  NONE = 'none',
  ALPHABET = 'alphabet',
  LENGTH = 'length',
}

export const App = () => {
  const [sortType, setSortType] = useState<SortType>(SortType.NONE);
  const [isReversed, setIsReversed] = useState<boolean>(false);

  const displayedGoods = useMemo(() => {
    const list = [...goodsFromServer];

    if (sortType === SortType.ALPHABET) {
      list.sort((a, b) => a.localeCompare(b));
    } else if (sortType === SortType.LENGTH) {
      list.sort((a, b) => a.length - b.length);
    }

    if (isReversed) {
      list.reverse();
    }

    return list;
  }, [sortType, isReversed]);

  const handleSortAlphabetically = () => setSortType(SortType.ALPHABET);
  const handleSortByLength = () => setSortType(SortType.LENGTH);
  const handleReverseGoods = () => setIsReversed(!isReversed);
  const handleResetGoods = () => {
    setSortType(SortType.NONE);
    setIsReversed(false);
  };

  const isResetVisible = sortType !== SortType.NONE || isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortType === SortType.ALPHABET ? '' : 'is-light'}`}
          onClick={handleSortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortType === SortType.LENGTH ? '' : 'is-light'}`}
          onClick={handleSortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={handleReverseGoods}
        >
          Reverse
        </button>

        {isResetVisible && (
          <button
            type="button"
            className="button is-danger"
            onClick={handleResetGoods}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {displayedGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
