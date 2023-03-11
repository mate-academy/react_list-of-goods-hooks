import { FC, useState } from 'react';
import 'bulma/css/bulma.css';
import cn from 'classnames';
import './App.scss';
import { SortType } from './typedefs';
import { getReorderedGoods } from '../helpers/helpers';
import { goodsFromServer } from '../api/goodsFromServer';
import { GoodsList } from '../GoodsList/GoodsList';

export const App: FC = () => {
  const [isReversed, setIsReversed] = useState(false);
  const [sortType, setSortType] = useState(SortType.NONE);

  const checkOrder = sortType !== SortType.NONE || isReversed;

  const reorderedGoods = getReorderedGoods(
    goodsFromServer,
    { sortType, isReversed },
  );

  const reverseList = () => {
    setIsReversed((currentState) => !currentState);
  };

  const resetOrder = () => {
    setSortType(SortType.NONE);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn(
            'button is-info',
            { 'is-light': sortType !== SortType.ALPHABET },
          )}
          onClick={() => setSortType(SortType.ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn(
            'button is-success',
            { 'is-light': sortType !== SortType.LENGTH },
          )}
          onClick={() => setSortType(SortType.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn(
            'button is-warning',
            { 'is-light': !isReversed },
          )}
          onClick={reverseList}
        >
          Reverse
        </button>

        {checkOrder && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={resetOrder}
          >
            Reset
          </button>
        )}
      </div>

      <GoodsList goods={reorderedGoods} />
    </div>
  );
};
