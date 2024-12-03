import 'bulma/css/bulma.css';
import './App.scss';
import { useState, FC } from 'react';

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

export enum SortKeys {
  ALPHABETICAL = 'Alphabetical',
  LENGTH = 'Length',
}

export const App: FC = () => {
  const [sort, setSort] = useState<string>('');
  const [isReversed, setIsReversed] = useState<boolean>(false);

  const getSortedList = (): string[] => {
    let sortedGoods = [...goodsFromServer];

    switch (sort) {
      case SortKeys.ALPHABETICAL:
        sortedGoods.sort();
        break;
      case SortKeys.LENGTH:
        sortedGoods.sort((a, b) => a.length - b.length);
        break;
      default:
        sortedGoods = [...goodsFromServer];
    }

    return isReversed ? sortedGoods.reverse() : sortedGoods;
  };

  const toggleReverse = (): void => {
    setIsReversed(prev => !prev);
  };

  const isOriginalOrder = sort === '' && !isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sort === SortKeys.ALPHABETICAL ? '' : 'is-light'}`}
          onClick={(): void => setSort(SortKeys.ALPHABETICAL)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sort === SortKeys.LENGTH ? '' : 'is-light'}`}
          onClick={(): void => setSort(SortKeys.LENGTH)}
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

        {!isOriginalOrder && (
          <button
            type="button"
            className="button is-danger"
            onClick={(): void => {
              setSort('');
              setIsReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {getSortedList().map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
