import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

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

enum SortField {
  alphabet = 'alphabet',
  length = 'length',
}

export const App: React.FC = () => {
  const [goods, setGoods] = useState<string[]>(goodsFromServer);
  const [isActive, setIsActive] = useState<SortField>();
  const [reverse, setReverse] = useState(false);

  const resetSort = () => {
    setGoods([...goodsFromServer]);
    setIsActive(undefined);
    setReverse(false);
  };

  const reversGoods = (foods: string[]) => {
    setReverse(!reverse);
    setGoods([...foods].reverse());
  };

  const sortedGoods = (type: SortField): void => {
    setGoods(
      [...goods].sort((good1, good2) => {
        if (type === SortField.alphabet) {
          setIsActive(type);
          if (reverse) {
            return good2.localeCompare(good1);
          }

          return good1.localeCompare(good2);
        }

        if (type === SortField.length) {
          setIsActive(type);
          if (reverse) {
            return good2.length - good1.length;
          }

          return good1.length - good2.length;
        }

        return 0;
      }),
    );
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => {
            sortedGoods(SortField.alphabet);
          }}
          type="button"
          className={`button is-info ${isActive !== SortField.alphabet ? 'is-light' : ''} `}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => {
            sortedGoods(SortField.length);
          }}
          type="button"
          className={`button is-success ${isActive !== SortField.length ? 'is-light' : ''} `}
        >
          Sort by length
        </button>

        <button
          onClick={() => {
            reversGoods(goods);
          }}
          type="button"
          className={`button is-warning ${reverse ? '' : 'is-light'} `}
        >
          Reverse
        </button>

        {(isActive || reverse) && (
          <button
            onClick={resetSort}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
