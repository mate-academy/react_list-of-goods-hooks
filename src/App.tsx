import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';

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

const SortType = {
  ALPHABETICALLY: 'sortByAlphabet',
  LENGTH: 'sortByLength',
};

interface SortOptions {
  sortField: string;
  isReverse: boolean;
}

interface AppState {
  sortField: string;
  isReverse: boolean;
}

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    sortField: '',
    isReverse: false,
  });

  const setSortedGoods = (
    goods: string[], { sortField, isReverse }: SortOptions,
  ) => {
    const sortedGoods = [...goods];

    if (sortField) {
      sortedGoods.sort((good1, good2) => {
        switch (sortField) {
          case SortType.ALPHABETICALLY:
            return good1.localeCompare(good2);

          case SortType.LENGTH:
            return good1.length - good2.length;

          default:
            return 0;
        }
      });
    }

    if (isReverse) {
      return sortedGoods.reverse();
    }

    return sortedGoods;
  };

  const handleSort = (sortField: string) => {
    setState((prevState) => ({
      ...prevState,
      sortField: prevState.sortField === sortField ? '' : sortField,
    }));
  };

  const handleReverse = () => {
    setState((prevState) => ({
      ...prevState,
      isReverse: !prevState.isReverse,
    }));
  };

  const handleReset = () => {
    setState({
      sortField: '',
      isReverse: false,
    });
  };

  const { sortField, isReverse } = state;
  const goods = setSortedGoods(goodsFromServer, {
    sortField,
    isReverse,
  });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortField !== SortType.ALPHABETICALLY,
          })}
          onClick={() => handleSort(SortType.ALPHABETICALLY)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortField !== SortType.LENGTH,
          })}
          onClick={() => handleSort(SortType.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', { 'is-light': !isReverse })}
          onClick={handleReverse}
        >
          Reverse
        </button>

        {(sortField || isReverse) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleReset}
          >
            Reset
          </button>
        )}
      </div>
      <ul>
        {goods.map((good) => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
