import React from 'react';
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

const SORT_BY_ALPHABET = 'alphabet';
const SORT_BY_LENGTH = 'length';

type SortTypes = {
  sortCase: 'alphabet' | 'length' | null;
  reverseCase: boolean;
};
type Goods = string[];

function getPreparedGoods(goods: Goods, { sortCase, reverseCase }: SortTypes) {
  const preparedGoods = [...goods];

  if (sortCase) {
    preparedGoods.sort((good1, good2) => {
      switch (sortCase) {
        case SORT_BY_ALPHABET:
          return good1.localeCompare(good2);

        case SORT_BY_LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (reverseCase) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortCase, setSortCase] = useState<SortTypes['sortCase']>(null);
  const [reverseCase, setReverseCase] = useState(false);
  const visibleGoods = getPreparedGoods(goodsFromServer, {
    sortCase,
    reverseCase,
  });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortCase(SORT_BY_ALPHABET)}
          type="button"
          className={cn(
            { 'is-light': SORT_BY_ALPHABET !== sortCase },
            'button is-info',
          )}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortCase(SORT_BY_LENGTH)}
          type="button"
          className={cn(
            { 'is-light': SORT_BY_LENGTH !== sortCase },
            'button is-success',
          )}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn({ 'is-light': !reverseCase }, 'button is-warning')}
          onClick={() => {
            setReverseCase(!reverseCase);
          }}
        >
          Reverse
        </button>

        {(sortCase || reverseCase) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortCase(null);
              setReverseCase(false);
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
