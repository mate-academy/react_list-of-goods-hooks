import { useState } from 'react';
import cn from 'classnames';
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
  Alphabeth = 'alphabetically',
  Length = 'length',
  Default = '',
}

interface SortingFiltres {
  sortType: SortType;
  isReversed: boolean;
}

function getPreparedGoods(
  goods: string [],
  { sortType, isReversed } : SortingFiltres,
): string [] {
  let preparedGoods = [...goods];

  if (sortType) {
    preparedGoods.sort((good1, good2) => {
      switch (sortType) {
        case SortType.Alphabeth:
          return good1.localeCompare(good2);

        case SortType.Length:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    preparedGoods = preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortType, setSortType] = useState(SortType.Default);
  const [isReversed, setIsReverse] = useState(false);
  // eslint-disable-next-line max-len
  const visibleGoods = getPreparedGoods(goodsFromServer, { sortType, isReversed });

  return (

    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info',
            { 'is-light': sortType !== SortType.Alphabeth })}
          onClick={() => setSortType(SortType.Alphabeth)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success',
            { 'is-light': sortType !== SortType.Length })}
          onClick={() => setSortType(SortType.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning',
            { 'is-light': !isReversed })}
          onClick={() => setIsReverse(!isReversed)}
        >
          Reverse
        </button>

        {(sortType || isReversed) && (
          <button
            type="button"
            className={cn('button', 'is-danger', 'is-light')}
            onClick={() => {
              setSortType(SortType.Default);
              setIsReverse(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
