import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import { goodsArrayFromServer } from './types/GoodsFromServer';
import { SortType } from './types/SortType';
import classNames from 'classnames';

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortType | ''>('');
  const [isReverse, setIsReverse] = useState(false);

  const visibleGoods = [...goodsArrayFromServer].sort((good1, good2) => {
    switch (sortField) {
      case SortType.Alphabetically:
        return good1.localeCompare(good2);

      case SortType.Length:
        return good1.length - good2.length;

      default:
        return SortType.Default;
    }
  });

  const reset = () => {
    setSortField('');
    setIsReverse(false);
  };

  if (isReverse) {
    visibleGoods.reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField(SortType.Alphabetically)}
          type="button"
          className={classNames('button', 'is-info', {
            'is-light': sortField !== SortType.Alphabetically,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField(SortType.Length)}
          type="button"
          className={classNames('button', 'is-success', {
            'is-light': sortField !== SortType.Length,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={() => setIsReverse(prevReverse => !prevReverse)}
          type="button"
          className={classNames('button', 'is-warning', {
            'is-light': !isReverse,
          })}
        >
          Reverse
        </button>

        {(isReverse || sortField) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={reset}
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
