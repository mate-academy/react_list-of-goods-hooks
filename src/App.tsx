import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import { GoodsList } from './components/GoodsList';

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
  NONE = 'none',
  ALPH = 'alph',
  LENGTH = 'length',
}

function getPreparedGoods(
  goods: string[],
  sortType: SortType,
  isReversed: boolean,
): string[] {
  const result = [...goods];

  switch (sortType) {
    case SortType.ALPH:
      result.sort((a, b) => a.localeCompare(b));
      break;
    case SortType.LENGTH:
      result.sort((a, b) => a.length - b.length);
      break;
    default:
      break;
  }

  if (isReversed) {
    result.reverse();
  }

  return result;
}

export const App: React.FC = () => {
  const [sortType, setSortType] = useState<SortType>(SortType.NONE);
  const [isReversed, setIsReversed] = useState(false);

  const preparedGoods = getPreparedGoods(goodsFromServer, sortType, isReversed);

  const showReset = sortType !== SortType.NONE || isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          data-cy="sortByName"
          className={`button is-info ${sortType === SortType.ALPH ? '' : 'is-light'}`}
          onClick={() => setSortType(SortType.ALPH)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          data-cy="sortByLength"
          className={`button is-success ${sortType === SortType.LENGTH ? '' : 'is-light'}`}
          onClick={() => setSortType(SortType.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          data-cy="reverse"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={() => setIsReversed(prev => !prev)}
        >
          Reverse
        </button>

        {showReset && (
          <button
            type="button"
            data-cy="reset"
            className="button is-danger is-light"
            onClick={() => {
              setIsReversed(false);
              setSortType(SortType.NONE);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <GoodsList goods={preparedGoods} />
    </div>
  );
};
