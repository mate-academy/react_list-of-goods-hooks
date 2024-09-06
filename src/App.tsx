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

  function handleAlphabetSort() {
    if (sortType === SortType.Alphabet && !isReversed) {
      return;
    }

    const sortedItems = [...items].sort((a, b) => a.localeCompare(b));

    if (isReversed) {
      sortedItems.reverse();
    }

    setItems(sortedItems);
    setSortType(SortType.Alphabet);
  }

  function handleLengthSort() {
    if (sortType === SortType.Length && !isReversed) {
      return;
    }

    const sortedItems = [...items].sort((good1, good2) => {
      if (good1.length === good2.length) {
        return good1.localeCompare(good2);
      }

      return good1.length - good2.length;
    });

    if (isReversed) {
      sortedItems.reverse();
    }

    setItems(sortedItems);
    setSortType(SortType.Length);
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
          onClick={handleAlphabetSort}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button', 'is-success', {
            'is-light': sortType !== SortType.Length,
          })}
          onClick={handleLengthSort}
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
