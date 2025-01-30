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

enum SortField {
  Alphabet = 'alphabet',
  Length = 'length',
}

function getPreparedGood(
  goodsList: string[],
  sortField: SortField | '',
  isReversed: boolean,
): string[] {
  const goods = [...goodsList];

  if (sortField === SortField.Alphabet) {
    goods.sort();
  }

  if (sortField === SortField.Length) {
    goods.sort((a, b) => a.length - b.length);
  }

  if (isReversed) {
    goods.reverse();
  }

  return goods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortField | ''>('');
  const [isReversed, setIsReversed] = useState<boolean>(false);
  const isModified = sortField !== '' || isReversed;
  const visibleGoods = getPreparedGood(goodsFromServer, sortField, isReversed);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortField === SortField.Alphabet ? '' : 'is-light'}`}
          onClick={() => setSortField(SortField.Alphabet)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortField === SortField.Length ? '' : 'is-light'}`}
          onClick={() => setSortField(SortField.Length)}
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
          <li key={good}>{good}</li>
        ))}
      </ul>
    </div>
  );
};
