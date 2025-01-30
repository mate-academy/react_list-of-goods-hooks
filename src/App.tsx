import { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

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

const SORT_FIELD_ALPHABET = 'alphabet';
const SORT_FIELD_LENGTH = 'length';

type SortField = typeof SORT_FIELD_ALPHABET | typeof SORT_FIELD_LENGTH | '';

function getPreparedGood(
  GoodList: string[],
  sortField: SortField,
  isReversed: boolean,
): string[] {
  const Goods = [...GoodList];

  if (sortField === SORT_FIELD_ALPHABET) {
    Goods.sort();
  }

  if (sortField === SORT_FIELD_LENGTH) {
    Goods.sort((a, b) => a.length - b.length);
  }

  if (isReversed) {
    Goods.reverse();
  }

  return Goods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortField>('');
  const [isReversed, setIsReversed] = useState<boolean>(false);
  const isModified = sortField !== '' || isReversed;
  const visibleGoods = getPreparedGood(
    [...goodsFromServer],
    sortField,
    isReversed,
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortField === SORT_FIELD_ALPHABET ? '' : 'is-light'}`}
          onClick={() => setSortField(SORT_FIELD_ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortField === SORT_FIELD_LENGTH ? '' : 'is-light'}`}
          onClick={() => setSortField(SORT_FIELD_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={() => setIsReversed(prev => !prev)}
        >
          Reverse
        </button>

        {isModified && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortField('');
              setIsReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li key={good}> {good} </li>
        ))}
      </ul>
    </div>
  );
};
