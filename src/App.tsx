import React, { useState } from 'react';
import cn from 'classnames';
import 'bulma/css/bulma.css';
import './App.scss';
import { GoodList } from './Components/GoodList/GoodList';
import { goodsFromServer } from './Components/GoodsFromServer';
import { SortType } from './types/SortType';

function getPreparedGoods(
  goods: string[],
  sortField: SortType,
  isReversed: boolean,
) {
  const preparedGoods: string[] = [...goods];

  if (sortField) {
    let sortFunction;

    switch (sortField) {
      case SortType.Name:
        sortFunction = (
          good1: string,
          good2: string,
        ) => good1.localeCompare(good2);
        break;

      case SortType.Length:
        sortFunction = (
          good1: string,
          good2: string,
        ) => good1.length - good2.length;
        break;

      default:
        throw new Error(`Unknown sort field: ${sortField}`);
    }

    if (sortFunction) {
      preparedGoods.sort(sortFunction);
    }
  }

  if (isReversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState(SortType.Default);
  const [isReversed, setIsReversed] = useState(false);
  const hasSortFieldOrIsReversed = (sortField || isReversed);
  const visibleGoods = getPreparedGoods(
    goodsFromServer,
    sortField,
    isReversed,
  );

  function reset(): void {
    setSortField(SortType.Default);
    setIsReversed(false);
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField(SortType.Name)}
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortField !== SortType.Name,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField(SortType.Length)}
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortField !== SortType.Length,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={() => setIsReversed(!isReversed)}
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !isReversed,
          })}
        >
          Reverse
        </button>

        {hasSortFieldOrIsReversed && (
          <button
            onClick={reset}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <GoodList goods={visibleGoods} />
    </div>
  );
};
