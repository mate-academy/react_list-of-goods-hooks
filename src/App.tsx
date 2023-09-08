import { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';
import { GoodList } from './GoodsList';

export const goodsFromServer = [
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

enum SortType {
  ALPHABETICAL = 'Sort alphabetically',
  LENGTH = 'Sort by length',
  DEFAULT = 0,
}

const SORT_FIELD_ALPHABET = SortType.ALPHABETICAL;
const SORT_FIELD_LENGTH = SortType.LENGTH;

type SortingOptions = {
  sortField: SortType;
  isReversed: boolean;
};

function getPreparedGoods(
  goods: string[],
  { sortField, isReversed }: SortingOptions,
) {
  const preparedGoods = [...goods];

  if (!sortField && isReversed) {
    return preparedGoods.reverse();
  }

  if (sortField) {
    preparedGoods.sort((a, b) => {
      switch (sortField) {
        case SortType.ALPHABETICAL:
          return isReversed ? b.localeCompare(a) : a.localeCompare(b);
        case SortType.LENGTH:
          if (a.length !== b.length) {
            return isReversed ? b.length - a.length : a.length - b.length;
          }

          return isReversed ? b.localeCompare(a) : a.localeCompare(b);

        default:
          return SortType.DEFAULT;
      }
    });
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState(SortType.DEFAULT);
  const [isReversed, setIsReversed] = useState(false);
  const visibleGoods = getPreparedGoods(goodsFromServer, {
    sortField,
    isReversed,
  });

  const reset = () => {
    setSortField(SortType.DEFAULT);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField(SORT_FIELD_ALPHABET)}
          type="button"
          className={cn(
            'button',
            'is-info',
            { 'is-light': sortField !== SORT_FIELD_ALPHABET },
            { active: SORT_FIELD_ALPHABET },
          )}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField(SORT_FIELD_LENGTH)}
          type="button"
          className={cn(
            'button',
            'is-success',
            { 'is-light': sortField !== SORT_FIELD_LENGTH },
            { active: SORT_FIELD_LENGTH },
          )}
        >
          Sort by length
        </button>

        <button
          onClick={() => {
            setIsReversed(!isReversed);
          }}
          type="button"
          className={cn(
            'button',
            'is-warning',
            { 'is-light': !isReversed },
            { active: isReversed },
          )}
        >
          Reverse
        </button>

        {(sortField || isReversed) && (
          <button
            onClick={reset}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul className="GoodList">
        <GoodList goods={visibleGoods} />
      </ul>
    </div>
  );
};
