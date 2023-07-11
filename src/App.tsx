import 'bulma/css/bulma.css';
import cn from 'classnames';
import { FC, useState } from 'react';
import { GoodsList } from './components/GoodsList';
import './App.scss';
import { SortType } from './enums/SortType';

export const goodsFromServer: string[] = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
];

interface GetSortedGoodsParams {
  sortField: SortType;
  isReversed: boolean;
}

const getSortedGoods = (
  goods: string[],
  { sortField, isReversed }: GetSortedGoodsParams,
) => {
  const visibleGoods = [...goods];

  if (sortField) {
    visibleGoods.sort((item1, item2) => {
      switch (sortField) {
        case SortType.NAME:
          return item1.localeCompare(item2);
        case SortType.LENGTH:
          return item1.length - item2.length;
        default:
          return 0;
      }
    });
  }

  return isReversed ? visibleGoods.reverse() : visibleGoods;
};

export const App: FC = () => {
  const [sortField, setSortField] = useState<SortType | ''>('');
  const [isReversed, setIsReversed] = useState(false);

  const sortedGoods = getSortedGoods(
    goodsFromServer, { sortField, isReversed } as GetSortedGoodsParams,
  );

  const resetSortField = () => {
    setSortField('');
    setIsReversed(false);
  };

  const showResetButton = sortField || isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info',
            { 'is-light': sortField !== SortType.NAME })}
          onClick={() => setSortField(SortType.NAME)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success',
            { 'is-light': sortField !== SortType.LENGTH })}
          onClick={() => setSortField(SortType.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', { 'is-light': !isReversed })}
          onClick={() => setIsReversed((reversed) => !reversed)}
        >
          Reverse
        </button>

        {showResetButton && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => resetSortField()}
          >
            Reset
          </button>
        )}
      </div>

      <GoodsList goods={sortedGoods} />
    </div>
  );
};
