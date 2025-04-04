import { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

enum SortType {
  Default,
  Alphabetical,
  Length,
  Reverse,
}

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

export const App: React.FC = () => {
  const [goods, setGoods] = useState<string[]>(goodsFromServer);
  const [originalGoods] = useState<string[]>(goodsFromServer);
  const [lastSortedGoods, setLastSortedGoods] =
    useState<string[]>(goodsFromServer);
  const [isReversed, setIsReversed] = useState<boolean>(false);
  const [activeSortType, setActiveSortType] = useState<SortType>(
    SortType.Default,
  );

  const handleSortAlphabetically = () => {
    const sortedGoods = [...goods].sort((a, b) => a.localeCompare(b));

    setGoods(sortedGoods);
    setLastSortedGoods([...sortedGoods]);
    setIsReversed(false);
    setActiveSortType(SortType.Alphabetical);
  };

  const handleSortByLength = () => {
    const sortedGoods = [...goods].sort((a, b) => a.length - b.length);

    setGoods(sortedGoods);
    setLastSortedGoods([...sortedGoods]);
    setIsReversed(false);
    setActiveSortType(SortType.Length);
  };

  const handleReverseOrder = () => {
    const reversedGoods = isReversed
      ? [...lastSortedGoods]
      : [...goods].reverse();

    setGoods(reversedGoods);
    setIsReversed(!isReversed);
    setActiveSortType(SortType.Reverse);
  };

  const handleResetOrder = () => {
    setGoods(originalGoods);
    setLastSortedGoods(originalGoods);
    setIsReversed(false);
    setActiveSortType(SortType.Default);
  };

  const isResetVisible =
    JSON.stringify(goods) !== JSON.stringify(originalGoods);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${activeSortType === SortType.Alphabetical ? '' : 'is-light'}`}
          onClick={handleSortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${activeSortType === SortType.Length ? '' : 'is-light'}`}
          onClick={handleSortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${activeSortType === SortType.Reverse ? '' : 'is-light'}`}
          onClick={handleReverseOrder}
        >
          Reverse
        </button>

        {isResetVisible && (
          <button
            type="button"
            className="button is-danger"
            onClick={handleResetOrder}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
