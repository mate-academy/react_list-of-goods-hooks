import 'bulma/css/bulma.css';
import './App.scss';
import { useMemo, useState } from 'react';
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
  { appliedSort, isReversed }: FilteredGoods,
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

  if (isReversed) {
    visibleGoods.reverse();
  }

  return visibleGoods;
}

export const App = () => {
  const [appliedSort, setAppliedSort] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  const handleResetClick = () => {
    setAppliedSort('');
    setIsReversed(false);
  };

  const handleReverseClick = () => {
    setIsReversed(prev => !prev);
  }

  const handleSortClick = () => {
    setAppliedSort(SortVariants.APPLIED_SORT_ALPHABETICALLY);
  }

  const visibleGoods = useMemo(() => {
    return getSortedGoods(goodsFromServer, { appliedSort, isReversed });
  }, [goodsFromServer, appliedSort, isReversed]);

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
          onClick={handleSortClick}
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
            { 'is-light': !isReversed })}
          onClick={handleReverseClick}
        >
          Reverse
        </button>

        {(appliedSort || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleResetClick}
          >
            Reset
          </button>
        )}

      </div>

      <GoodList goods={visibleGoods} />
    </div>
  );
};
