import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';
import { useState } from 'react';
import goodsFromServer from './db/goods.json';
import { SortType } from './utils/enums/sortType';
import GoodsList from './components/GoodsList';
import sortGoods from './utils/sortGoods/sortGoods';

export const App = () => {
  const [sortType, setSortType] = useState<SortType>(SortType.SORT_BY_DEFAULT);
  const [isReverse, setReverse] = useState(false);

  const goods = sortGoods(goodsFromServer, sortType, isReverse);

  const handleReset = () => {
    setSortType(SortType.SORT_BY_DEFAULT);
    setReverse(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortType !== SortType.SORT_BY_CHAR,
          })}
          onClick={() => setSortType(SortType.SORT_BY_CHAR)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortType !== SortType.SORT_BY_LENGTH,
          })}
          onClick={() => setSortType(SortType.SORT_BY_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': !isReverse,
          })}
          onClick={() => {
            setReverse(!isReverse);
          }}
        >
          Reverse
        </button>

        {(sortType.length || isReverse) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleReset}
          >
            Reset
          </button>
        )}
      </div>

      <GoodsList goods={goods} />
    </div>
  );
};
