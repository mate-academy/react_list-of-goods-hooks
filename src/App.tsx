import 'bulma/css/bulma.css';
import './App.scss';

import { useState } from 'react';
import { GoodsList } from './components/GoodsList/GoodsList';

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
  NONE = '', 
  ALPHABETICALLY = 'alphabetically',
  LENGTH = 'length',
  REVERSE = 'reverse',
}

interface SortOptions {
  sortField: SortType;
  isReversed?: boolean;
}

function getSortedGoods(goods: string[], { sortField, isReversed }: SortOptions): string[] {
  const preparedGoods = [...goods];

  switch (sortField) {
    case SortType.ALPHABETICALLY:
      preparedGoods.sort((a, b) => a.localeCompare(b));
      break;

    case SortType.LENGTH:
      preparedGoods.sort((a, b) => a.length - b.length);
      break;

    case SortType.NONE:
    default:
      break;
  }

  if (isReversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState<SortType>(SortType.NONE);
  const [isReversed, setIsReversed] = useState(false);
  const visibleGoods = getSortedGoods(goodsFromServer, { sortField, isReversed });

  const handleReset = () => {
    setSortField(SortType.NONE);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortField === SortType.ALPHABETICALLY ? '' : 'is-light'}`}
          onClick={() => setSortField(SortType.ALPHABETICALLY)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-info ${sortField === SortType.LENGTH ? '' : 'is-light'}`}
          onClick={() => setSortField(SortType.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={() => setIsReversed(prev => !prev)}
        >
          Reverse
        </button>

        {sortField || isReversed ? (
          <button
            type="button"
            className="button is-danger"
            onClick={handleReset}
          >
            Reset
          </button>
        ) : null}
      </div>

      <GoodsList goods={visibleGoods} />
    </div>
  );
};