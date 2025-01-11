import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

type TData = string[];

type TGetPreparedGoods = (
  goods: string[],
  { sort, reverse }: { sort: string; reverse: boolean },
) => string[];

export const goodsFromServer: TData = [
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

const ALPHABET_SORT: string = 'alphabet';
const STR_LENGTH_SORT: string = 'length';

const getPreparedGoods: TGetPreparedGoods = (goods, { sort, reverse }) => {
  const preparedGoods = [...goods];

  if (sort) {
    preparedGoods.sort((good1, good2) => {
      switch (sort) {
        case ALPHABET_SORT:
          return good1.localeCompare(good2);
        case STR_LENGTH_SORT:
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  }

  if (reverse) {
    return preparedGoods.reverse();
  }

  return preparedGoods;
};

export const App: React.FC = () => {
  const [sort, setSort] = useState<string>('');
  const [reverse, setReverse] = useState<boolean>(false);
  const [classActive, setClassActive] = useState<string>('');

  const preparedGoods = getPreparedGoods(goodsFromServer, { sort, reverse });

  const resetFilters = () => {
    setSort('');
    setReverse(false);
    setClassActive('');
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${classActive === ALPHABET_SORT ? '' : 'is-light'}`}
          onClick={() => {
            setSort(ALPHABET_SORT);
            setClassActive(ALPHABET_SORT);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${classActive === STR_LENGTH_SORT ? '' : 'is-light'}`}
          onClick={() => {
            setSort(STR_LENGTH_SORT);
            setClassActive(STR_LENGTH_SORT);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${reverse ? '' : 'is-light'}`}
          onClick={() => {
            setSort(sort);
            setReverse(!reverse);
          }}
        >
          Reverse
        </button>

        {(sort || reverse) && (
          <button
            onClick={() => resetFilters()}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {preparedGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
