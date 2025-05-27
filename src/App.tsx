import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import { SortType } from './types';

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

export const App = () => {
  const [sortType, setSortType] = useState<SortType>(SortType.Default);
  const [isReversed, setIsReversed] = useState<boolean>(false);

  const getSortedGoods = (): string[] => {
    const sorted = [...goodsFromServer];

    switch (sortType) {
      case SortType.Alphabet:
        sorted.sort((a, b) => a.localeCompare(b));
        break;
      case SortType.Length:
        sorted.sort((a, b) => a.length - b.length);
        break;
      case SortType.Default:
      default:
        break;
    }

    if (isReversed) {
      sorted.reverse();
    }

    return sorted;
  };

  const sortAlphabetical = () => setSortType(SortType.Alphabet);
  const sortByLength = () => setSortType(SortType.Length);
  const reverseGoods = () => setIsReversed(prev => !prev);
  const resetGoods = () => {
    setSortType(SortType.Default);
    setIsReversed(false);
  };

  const isOriginalOrder =
    sortType === SortType.Default &&
    !isReversed &&
    goodsFromServer.every((item, index) => item === getSortedGoods()[index]);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortType === SortType.Alphabet ? '' : 'is-light'}`}
          onClick={sortAlphabetical}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-info ${sortType === SortType.Length ? '' : 'is-light'}`}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-info ${isReversed ? '' : 'is-light'}`}
          onClick={reverseGoods}
        >
          Reverse
        </button>

        {!isOriginalOrder && (
          <button
            type="button"
            className="button is-danger"
            onClick={resetGoods}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {getSortedGoods().map((good: string) => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
