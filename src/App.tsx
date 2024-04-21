import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import cn from 'classnames';

enum SortType {
  length = 'length',
  alphabetically = 'alphabetically',
}

interface Sort {
  sortField: SortType | '';
  reverseField: boolean;
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

const getPrepearedGoods = (
  goods: string[],
  { sortField, reverseField }: Sort,
) => {
  const goodsCopy = goods.slice();

  goodsCopy.sort((good1, good2) => {
    switch (sortField) {
      case SortType.length:
        return good1.length - good2.length;
      case SortType.alphabetically:
        return good1.localeCompare(good2);
      default:
        return 0;
    }
  });

  if (reverseField) {
    goodsCopy.reverse();
  }

  return goodsCopy;
};

export const App = () => {
  const [sortField, setSortField] = useState<SortType | ''>('');
  const [reverseField, setReverseField] = useState(false);

  const visibleGoods = getPrepearedGoods(goodsFromServer, {
    sortField,
    reverseField,
  });

  const reset = () => {
    setSortField('');
    setReverseField(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortField !== SortType.alphabetically,
          })}
          onClick={() => setSortField(SortType.alphabetically)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortField !== SortType.length,
          })}
          onClick={() => setSortField(SortType.length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', { 'is-light': !reverseField })}
          onClick={() => setReverseField(!reverseField)}
        >
          Reverse
        </button>

        {(sortField || reverseField) && (
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
        {visibleGoods.map(good => {
          return (
            <li data-cy="Good" key={good}>
              {good}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
