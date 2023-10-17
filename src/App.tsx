import 'bulma/css/bulma.css';
import './App.scss';

import { useMemo, useState } from 'react';
import cn from 'classnames';

import { GoodList } from './Components/GoodList/GoodList';
import { goodsFromServer } from './api/Goods';

import { Good } from './types/Good';
import { SortParams } from './types/SortParams';

const SORT_FIELD_LENGTH = 'LENGTH';
const SORT_FIELD_ALPHABET = 'ALPHABET';

function sortGoods(
  goods: Good[],
  { sortField, isReverse }: SortParams,
): Good[] {
  const prepearedGoods = [...goods];

  if (sortField) {
    prepearedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SORT_FIELD_ALPHABET:
          return good1.localeCompare(good2);

        case SORT_FIELD_LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (isReverse) {
    prepearedGoods.reverse();
  }

  return prepearedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [isReverse, setIsReverse] = useState(false);

  const visibleGoods = useMemo(() => {
    return sortGoods(
      goodsFromServer,
      { sortField, isReverse },
    );
  }, [goodsFromServer, { sortField, isReverse }]);

  function reset() {
    setSortField('');
    setIsReverse(false);
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info',
            { 'is-light': sortField !== SORT_FIELD_ALPHABET })}
          onClick={() => setSortField(SORT_FIELD_ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success',
            { 'is-light': sortField !== SORT_FIELD_LENGTH })}
          onClick={() => setSortField(SORT_FIELD_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning',
            { 'is-light': !isReverse })}
          onClick={() => setIsReverse(prev => !prev)}
        >
          Reverse
        </button>

        {(isReverse || sortField) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => reset()}
          >
            Reset
          </button>
        )}
      </div>

      <GoodList goods={visibleGoods} />
    </div>

  );
};
