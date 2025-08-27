import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import { GoodList } from './Components/GoodList/GoodsList/GoodsList';

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

type SortField = SortType;

enum SortType {
  None = '',
  Name = 'NAME',
  Length = 'LENGTH',
}

function getPreparedGoods(
  goods: string[],
  sortField: SortField,
  isReversed: boolean,
): string[] {
  const preparedGoods = [...goods];

  switch (sortField) {
    case SortType.Name:
      preparedGoods.sort((a, b) => a.localeCompare(b));
      break;
    case SortType.Length:
      preparedGoods.sort((a, b) => a.length - b.length);
      break;
    default:
      break;
  }

  if (isReversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortType>(SortType.None);
  const [isReversed, setIsReversed] = useState(false);

  const visibleGoods = getPreparedGoods(goodsFromServer, sortField, isReversed);

  function handleSortChange(type: SortType) {
    setSortField(type);
  }

  function handleReverseToggle() {
    setIsReversed(prev => !prev);
  }

  function handleReset() {
    setSortField(SortType.None);
    setIsReversed(false);
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={
            sortField === SortType.Name
              ? 'button is-info'
              : 'button is-info is-light'
          }
          onClick={() => handleSortChange(SortType.Name)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={
            sortField === SortType.Length
              ? 'button is-success'
              : 'button is-success is-light'
          }
          onClick={() => handleSortChange(SortType.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={
            isReversed ? 'button is-warning' : 'button is-warning is-light'
          }
          onClick={handleReverseToggle}
        >
          Reverse
        </button>

        {(sortField || isReversed) && (
          <button
            type="button"
            className={
              sortField === SortType.None
                ? 'button is-danger'
                : 'button is-danger is-light'
            }
            onClick={handleReset}
          >
            Reset
          </button>
        )}
      </div>

      <GoodList goodsList={visibleGoods} />
    </div>
  );
};
