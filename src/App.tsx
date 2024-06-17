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
  default = '',
}

const getPreparedGoods = (
  goodsFromServer: string[],
  { sortField, reversed }: { sortField: SortField; reversed: boolean },
) => {
  const copyGoods = [...goodsFromServer];

  if (sortField !== SortField.default) {
    copyGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortField.alphabet:
          return good1.localeCompare(good2);
        case SortField.length:
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  }

  if (reversed) {
    copyGoods.reverse();
  }
  return copyGoods;
};

export const App: React.FC = () => {
  // const [goods, setGoods] = useState<string[]>(goodsFromServer);
  const [isActive, setIsActive] = useState(SortField.default);
  const [reverse, setReverse] = useState(false);

  const visibleGoods = getPreparedGoods(goodsFromServer, {
    sortField: isActive,
    reversed: reverse,
  });

  const resetSort = () => {
    // setGoods([...goodsFromServer]);
    setIsActive(SortField.default);
    setReverse(false);
  };

  const reversGoods = () => {
    setReverse(!reverse);
    // setGoods([...foods].reverse());
  };

  // const sortedOfTypes = (
  //   arrayGoods: string[],
  //   sortType: SortField,
  //   isReverse: boolean,
  // ) => {
  //   const result = [...arrayGoods].sort((good1, good2) => {
  //     switch (sortType) {
  //       case SortField.alphabet:
  //         if (isReverse) {
  //           return good2.localeCompare(good1);
  //         }

  //         return good1.localeCompare(good2);
  //       case SortField.length:
  //         if (isReverse) {
  //           return good2.length - good1.length;
  //         }

  //         return good1.length - good2.length;
  //       default:
  //         return 0;
  //     }
  //   });

  //   return result;
  // };

  // handle is active

  const sortedGoods = (type: SortField): void => {
    // setGoods(sortedOfTypes(goods, type, reverse));
    setIsActive(type);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => {
            setIsActive(SortField.alphabet);
          }}
          type="button"
          className={`button is-info ${isActive !== SortField.alphabet ? 'is-light' : ''} `}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => {
            setIsActive(SortField.length);
          }}
          type="button"
          className={`button is-success ${isActive !== SortField.length ? 'is-light' : ''} `}
        >
          Sort by length
        </button>

        <button
          onClick={() => {
            reversGoods();
          }}
          type="button"
          className={`button is-warning ${reverse ? '' : 'is-light'} `}
        >
          Reverse
        </button>

        {(isActive !== SortField.default || reverse) && (
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
        {visibleGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
