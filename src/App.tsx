import { FC, useState } from 'react';
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

export function getReorderedGoods(
  goods: string[],
  sortType: SortType,
  isReversed: boolean,
) {
  const visibleGoods = [...goods];

  switch (sortType) {
    case SortType.ALPHABET:
      visibleGoods.sort((a, b) => a.localeCompare(b));
      break;
    case SortType.LENGTH:
      visibleGoods.sort((a, b) => a.length - b.length);
      break;
    default:
  }

  return isReversed
    ? visibleGoods.reverse()
    : visibleGoods;
}

export const App: FC = () => {
  const [sortType, setSortType] = useState(SortType.NONE);
  const [isReversed, setIsReversed] = useState(false);

  const visibleGoods = getReorderedGoods(goodsFromServer, sortType, isReversed);

  const toggleSortType = (type: SortType) => {
    return sortType === type
      ? setSortType(SortType.NONE)
      : setSortType(type);
  };

  const handleSortByAlphab = () => (
    toggleSortType(SortType.ALPHABET)
  );

  const handleSortByLength = () => (
    toggleSortType(SortType.LENGTH)
  );

  const handleReverse = () => {
    setIsReversed(!isReversed);
  };

  const handleReset = () => {
    setSortType(SortType.NONE);
    setIsReversed(false);
  };

  const isSortedOrReversed = isReversed || (sortType !== SortType.NONE);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={handleSortByAlphab}
          className={cn(
            'button is-info',
            { 'is-light': sortType !== SortType.ALPHABET },
          )}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={handleSortByLength}
          className={cn(
            'button is-success',
            { 'is-light': sortType !== SortType.LENGTH },
          )}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={handleReverse}
          className={`button is-warning ${
            !isReversed && 'is-light'
          }`}
        >
          Reverse
        </button>

        { isSortedOrReversed && (
          <button
            type="button"
            onClick={handleReset}
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li
            data-cy="Good"
            key={good}
          >
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
