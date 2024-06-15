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
  const [isActive, setIsActive] = useState('');
  const [reverse, setReverse] = useState<boolean>(false);

  const resetSort = () => {
    setGoods([...goodsFromServer]);
    setIsActive('');
    setReverse(false);
  };

  const reversGoods = (foods: string[]) => {
    setReverse(!reverse);
    setGoods([...foods].reverse());
  };

  const sortedOfTypes = (
    arrayGoods: string[],
    sortType: SortField,
    isReverse: boolean,
  ) => {
    const result = [...arrayGoods].sort((good1, good2) => {
      switch (sortType) {
        case SortField.alphabet:
          if (isReverse) {
            return good2.localeCompare(good1);
          }

          return good1.localeCompare(good2);
        case SortField.length:
          if (isReverse) {
            return good2.length - good1.length;
          }

          return good1.length - good2.length;
        default:
          return 0;
      }
    });

    return result;
  };

  const sortedGoods = (type: SortField): void => {
    setGoods(sortedOfTypes(goods, type, reverse));
    setIsActive(type);
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
