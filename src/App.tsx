import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import cn from 'classnames';

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
  Alphabet = 'name',
  Length = 'length',
}

interface PreparedGoodsInterface {
  field: SortType | '';
  isReverse: boolean;
}

const prepareGoods = (
  goods: string[],
  { field, isReverse }: PreparedGoodsInterface,
) => {
  const preparedGoods = [...goods];

  if (field) {
    preparedGoods.sort((good1, good2) => {
      switch (field) {
        case SortType.Alphabet: {
          return good1.localeCompare(good2);
        }

        case SortType.Length: {
          return good1.length - good2.length;
        }

        default:
          return 0;
      }
    });
  }

  return isReverse ? preparedGoods.reverse() : preparedGoods;
};

export const App = () => {
  const [sortField, setSortField] = useState<SortType | ''>(SortType.Alphabet);
  const [reverse, setReverse] = useState(false);
  const showGoods = prepareGoods(goodsFromServer, {
    field: sortField,
    isReverse: reverse,
  });

  const reset = () => {
    setSortField(SortType.Alphabet);
    setReverse(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortField !== SortType.Alphabet,
          })}
          onClick={() => setSortField(SortType.Alphabet)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortField !== SortType.Length,
          })}
          onClick={() => setSortField(SortType.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': !reverse,
          })}
          onClick={() => setReverse(!reverse)}
        >
          Reverse
        </button>

        {(sortField !== SortType.Alphabet || reverse) && (
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
        {showGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
