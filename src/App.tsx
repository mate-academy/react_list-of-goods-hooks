import 'bulma/css/bulma.css';
import './App.scss';
import { useState, useMemo } from 'react';
import cn from 'classnames';

type SortField = 'name' | 'length' | '';

const SORT_FIELD_NAME = 'name';
const SORT_FIELD_LENGTH = 'length';

function getSortedGoods(goods: string[], sortField: SortField): string[] {
  const sortedGoods = [...goods];

  if (sortField) {
    sortedGoods.sort((good1: string, good2: string) => {
      switch (sortField) {
        case SORT_FIELD_NAME:
          return good1.toLowerCase().localeCompare(good2.toLowerCase());
        case SORT_FIELD_LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  return sortedGoods;
}

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
  'Garlic',
];

export const App = () => {
  const [sortField, setSortField] = useState<SortField>('');
  const [isReversed, setIsReversed] = useState<boolean>(false);

  const sortedGoods = useMemo<string[]>(() => {
    return getSortedGoods(goodsFromServer, sortField);
  }, [sortField]);

  const visibleGoods = useMemo<string[]>(() => {
    const list = [...sortedGoods];

    return isReversed ? list.reverse() : list;
  }, [sortedGoods, isReversed]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortField('');
      setIsReversed(false);
    } else {
      setSortField(field);
      setIsReversed(false);
    }
  };

  const handleReverse = () => {
    setIsReversed(prev => !prev);
  };

  const handleReset = () => {
    setSortField('');
    setIsReversed(false);
  };

  const isGoodsNotOriginal: boolean = sortField !== '' || isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        <div className="sortBy">
          <button
            type="button"
            className={cn('button is-info', {
              'is-light': sortField !== SORT_FIELD_NAME,
            })}
            onClick={() => handleSort(SORT_FIELD_NAME)}
          >
            Sort alphabetically
          </button>

          <button
            type="button"
            className={cn('button is-success', {
              'is-light': sortField !== SORT_FIELD_LENGTH,
            })}
            onClick={() => handleSort(SORT_FIELD_LENGTH)}
          >
            Sort by length
          </button>

          <button
            type="button"
            className={cn('button is-warning', { 'is-light': !isReversed })}
            onClick={handleReverse}
          >
            Reverse
          </button>
        </div>

        {isGoodsNotOriginal && (
          <button
            type="button"
            className="button is-danger"
            onClick={handleReset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map((good: string) => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
