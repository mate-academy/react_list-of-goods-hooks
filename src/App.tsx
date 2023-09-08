import React, { useState } from 'react';
import classnames from 'classnames';
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
      case SortType.Alphabetically:
        sortFunction = (a: string, b: string) => a.localeCompare(b);
        break;

      case SortType.Length:
        sortFunction = (a: string, b: string) => a.length - b.length;
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
  const [sortType, setSortType] = useState(SortType.Default);
  const [isReversed, setIsReversed] = useState(false);
  const isResetButtonVisible = sortType || isReversed;

  const visibleGoods = getPreparedGoods(
    goodsFromServer,
    sortType,
    isReversed,
  );

  function handleResetButtonClick(): void {
    setSortType(SortType.Default);
    setIsReversed(false);
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortType(SortType.Alphabetically)}
          type="button"
          className={classnames(
            'button',
            'is-info',
            { 'is-light': sortType !== SortType.Alphabetically },
          )}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortType(SortType.Length)}
          type="button"
          className={classnames(
            'button',
            'is-success',
            { 'is-light': sortType !== SortType.Length },
          )}
        >
          Sort by length
        </button>

        <button
          onClick={() => setIsReversed(iSReversed => !iSReversed)}
          type="button"
          className={classnames(
            'button',
            'is-warning',
            { 'is-light': !isReversed },
          )}
        >
          Reverse
        </button>

        {isResetButtonVisible && (
          <button
            onClick={handleResetButtonClick}
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
