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
  const [sortType, setSortType] = useState<SortType>(SortType.None);
  const [isReversed, setIsReversed] = useState<boolean>(false);

  function sortItems(array: string[], sortValue: SortType, reverse: boolean) {
    let sortedArray = [...array];

    switch (sortValue) {
      case SortType.Alphabet:
        sortedArray.sort((a, b) => a.localeCompare(b));
        break;

      case SortType.Length:
        sortedArray.sort((a, b) => a.length - b.length);
        break;

      default:
        sortedArray = array;
        break;
    }

    if (reverse) {
      sortedArray.reverse();
    }

    return sortedArray;
  }

  const items = sortItems(goodsFromServer, sortType, isReversed);

  const handleSort = (sortValue: SortType) => {
    setSortType(currentSort =>
      currentSort === sortValue && !isReversed ? SortType.None : sortValue,
    );
  };

  const handleGoodsReverse = () => {
    setIsReversed(!isReversed);
  };

  const handleReset = () => {
    setSortType(SortType.None);
    setIsReversed(false);
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

        {(sortType !== SortType.None || isReversed) && (
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
