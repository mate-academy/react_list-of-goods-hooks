import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

const SORT_BY_ALPHABETICALLY = 'ALPHABETICALLY';
const SORT_BY_LENGTH = 'LENGTH';

enum SortedMethod {
  ALPHABETICALLY = SORT_BY_ALPHABETICALLY,
  LENGTH = SORT_BY_LENGTH,

  //   default
  DEFAULT = '',
}

interface FillterParams {
  sortedMethod: SortedMethod;
  isRevers: boolean;
}

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

const getPrepareSort = (
  goods: string[],
  { sortedMethod, isRevers }: FillterParams,
) => {
  const prepareGoods: string[] = [...goods];

  prepareGoods.sort((a, b) => {
    switch (sortedMethod) {
      case SortedMethod.ALPHABETICALLY:
        return a.localeCompare(b);

      case SortedMethod.LENGTH:
        return a.length - b.length;

      default:
        return 0;
    }
  });

  if (isRevers) {
    prepareGoods.reverse();
  }

  return prepareGoods;
};

export const App: React.FC = () => {
  const [sortedMethod, setSortedMethod] = useState<SortedMethod>(
    SortedMethod.DEFAULT,
  );
  const [isRevers, setIsRevers] = useState<boolean>(false);
  const visibleGoods = getPrepareSort(goodsFromServer, {
    sortedMethod,
    isRevers,
  });

  const isVisibleResetButton =
    sortedMethod !== SortedMethod.DEFAULT || isRevers === true;

  const setRevers = () => {
    setIsRevers(prev => !prev);
  };

  const setSortMethod = (method: SortedMethod) => {
    setSortedMethod(method);
  };

  const onResetHandle = () => {
    setSortedMethod(SortedMethod.DEFAULT);
    setIsRevers(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info${sortedMethod === SortedMethod.ALPHABETICALLY ? '' : ' is-light'}`}
          onClick={() => {
            setSortMethod(SortedMethod.ALPHABETICALLY);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-info${sortedMethod === SortedMethod.LENGTH ? '' : ' is-light'}`}
          onClick={() => {
            setSortMethod(SortedMethod.LENGTH);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isRevers ? '' : ' is-light'}`}
          onClick={setRevers}
        >
          Reverse
        </button>

        {isVisibleResetButton && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={onResetHandle}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
