import 'bulma/css/bulma.css';
import { useState } from 'react';
import classNames from 'classnames';
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

enum SortType {
  Alphabet = 'alphabet',
  Length = 'length',
  None = '',
}

export const App: React.FC = () => {
  const [items, setItems] = useState<string[]>(goodsFromServer);
  const [sortType, setSortType] = useState<SortType>(SortType.None);
  const [isReversed, setIsReversed] = useState<boolean>(false);
  const [initialItems] = useState<string[]>(goodsFromServer);

  function sortItems(array: string[], sortValue: SortType, reverse: boolean) {
    const sortedArray = [...array];

    switch (sortValue) {
      case SortType.Alphabet:
        sortedArray.sort((a, b) => a.localeCompare(b));
        break;

      case SortType.Length:
        sortedArray.sort((a, b) => {
          if (a.length === b.length) {
            return a.localeCompare(b);
          }

          return a.length - b.length;
        });
        break;

      default:
        break;
    }

    if (reverse) {
      sortedArray.reverse();
    }

    return sortedArray;
  }

  function handleSort(sortValue: SortType) {
    if (sortType === sortValue && !isReversed) {
      return;
    }

    const sortedItems = sortItems(items, sortValue, isReversed);

    setItems(sortedItems);
    setSortType(sortValue);
  }

  const handleReset = () => {
    setItems(initialItems);
    setSortType(SortType.None);
    setIsReversed(false);
  };

  const handleGoodsReverse = () => {
    const reversedGoods = [...items].reverse();

    setItems(reversedGoods);
    setIsReversed(!isReversed);

    if (JSON.stringify(reversedGoods) === JSON.stringify(initialItems)) {
      setIsReversed(false);
    }
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button', 'is-info', {
            'is-light': sortType !== SortType.Alphabet,
          })}
          onClick={() => handleSort(SortType.Alphabet)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button', 'is-success', {
            'is-light': sortType !== SortType.Length,
          })}
          onClick={() => handleSort(SortType.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button', 'is-warning', {
            'is-light': !isReversed,
          })}
          onClick={handleGoodsReverse}
        >
          Reverse
        </button>

        {(sortType || isReversed) && (
          <button
            type="button"
            className={classNames('button', 'is-danger', 'is-light')}
            onClick={handleReset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {items.map((good, index) => (
          <li key={index} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
