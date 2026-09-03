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

enum SortType {
  alphabeticalSort = 'Alphabetical',
  lengthSort = 'sortByLength',
  default = 'default',
}

function prepareGoods<T extends string>(
  receivedGoods: T[],
  selectSort: SortType,
) {
  switch (selectSort) {
    case SortType.alphabeticalSort:
      return [...receivedGoods].sort((value1, value2) =>
        value1.localeCompare(value2),
      );

    case SortType.lengthSort:
      return [...receivedGoods].sort(
        (value1, value2) => value1.length - value2.length,
      );

    default:
      return [...receivedGoods];
  }
}

function handleSelectedReverseSort<T extends string>(
  receivedGoods: T[],
  reverseSort: boolean,
) {
  if (reverseSort) {
    return [...receivedGoods].reverse();
  }

  return receivedGoods;
}

export const App: React.FC = () => {
  const [selectSort, setSelectSort] = useState<SortType>(SortType.default);
  const [reverseSort, setReverseSort] = useState<boolean>(false);

  const goods = handleSelectedReverseSort(
    prepareGoods(goodsFromServer, selectSort),
    reverseSort,
  );

  function handleSelectSort(selectedSort: SortType) {
    setSelectSort(selectedSort);
  }

  function handleReverseSort(value: boolean) {
    setReverseSort(value);
  }

  function handleReset() {
    setSelectSort(SortType.default);
    setReverseSort(false);
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': selectSort !== SortType.alphabeticalSort,
          })}
          onClick={() => handleSelectSort(SortType.alphabeticalSort)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': selectSort !== SortType.lengthSort,
          })}
          onClick={() => handleSelectSort(SortType.lengthSort)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-danger', { 'is-light': !reverseSort })}
          onClick={() => handleReverseSort(!reverseSort)}
        >
          Reverse
        </button>
        {!(reverseSort === false && selectSort === SortType.default) && (
          <button
            type="button"
            className={cn('button', 'is-danger', 'is-light')}
            onClick={() => handleReset()}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
