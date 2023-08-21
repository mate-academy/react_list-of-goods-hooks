import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import cn from 'classnames';
import { GoodList } from './components/GoodsList';
import { FilteredGoods } from './types/FilteredGoods';
import { ProductList } from './types/ProductList';
import { SortVariants } from './types/SortVariants';

export const goodsFromServer: ProductList = [
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

function getSortedGoods(
  goods: ProductList,
  { appliedSort, reverseOrder }: FilteredGoods,
): string[] {
  const visibleGoods = [...goods];

  if (appliedSort) {
    visibleGoods.sort((good1, good2) => {
      switch (appliedSort) {
        case SortVariants.APPLIED_SORT_ALPHABETICALLY:
          return good1.localeCompare(good2);

        case SortVariants.APPLIED_SORT_LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (reverseOrder) {
    visibleGoods.reverse();
  }

  return visibleGoods;
}

export const App = () => {
  const [appliedSort, setAppliedSort] = useState('');
  const [reverseOrder, setReverseOrder] = useState(false);

  const reset = () => {
    setAppliedSort('');
    setReverseOrder(false);
  };

  const visibleGoods:ProductList = getSortedGoods(goodsFromServer,
    { appliedSort, reverseOrder });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info',
            {
              'is-light': appliedSort
            !== SortVariants.APPLIED_SORT_ALPHABETICALLY,
            })}
          onClick={() => setAppliedSort(
            SortVariants.APPLIED_SORT_ALPHABETICALLY,
          )}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success',
            { 'is-light': appliedSort !== SortVariants.APPLIED_SORT_LENGTH })}
          onClick={() => setAppliedSort(SortVariants.APPLIED_SORT_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning',
            { 'is-light': !reverseOrder })}
          onClick={() => setReverseOrder(!reverseOrder)}
        >
          Reverse
        </button>

        {(appliedSort || reverseOrder) && (
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
