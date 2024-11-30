import cn from 'classnames';
import { useState } from 'react';
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
  Alphabetical = 'alphabetical',
  Length = 'length',
  None = '',
}

export const App: React.FC = () => {
  const [sortedGoods, setSortedGoods] = useState<string[]>([
    ...goodsFromServer,
  ]);
  const [sortType, setSortType] = useState<SortType>(SortType.None);
  const [isReversed, setIsReversed] = useState<boolean>(false);

  const sortGoods = (goods: string[], type: SortType): string[] => {
    const sorted = [...goods];

    switch (type) {
      case SortType.Alphabetical:
        sorted.sort((a, b) => a.localeCompare(b));
        break;
      case SortType.Length:
        sorted.sort((a, b) => a.length - b.length);
        break;
      default:
        break;
    }

    if (isReversed) {
      sorted.reverse();
    }

    return sorted;
  };

  const handleSort = (type: SortType) => {
    const newSortType = type || sortType;

    setSortType(newSortType);

    const sorted = sortGoods(goodsFromServer, newSortType);

    setSortedGoods(sorted);
  };

  const handleReverse = () => {
    setIsReversed(!isReversed);
    setSortedGoods(prevGoods => [...prevGoods].reverse());
  };

  const resetSort = () => {
    setSortType(SortType.None);
    setIsReversed(false);
    setSortedGoods([...goodsFromServer]);
  };

  const buttonStyle = (type: SortType) => (sortType === type ? '' : 'is-light');

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', buttonStyle(SortType.Alphabetical))}
          onClick={() => handleSort(SortType.Alphabetical)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', buttonStyle(SortType.Length))}
          onClick={() => handleSort(SortType.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', { 'is-light': !isReversed })}
          onClick={handleReverse}
        >
          Reverse
        </button>

        {(sortType || isReversed) && (
          <button
            type="button"
            className="button is-danger"
            onClick={resetSort}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {sortedGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
