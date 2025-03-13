import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

const goodsFromServer: string[] = [
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

enum SORT {
  alphabet = 'alphabetically',
  length = 'length',
  none = '',
}

const sortGoods = (goods: string[], sortType: SORT, reverse: boolean) => {
  let sortedGoods = [...goods];

  switch (sortType) {
    case SORT.alphabet:
      sortedGoods.sort((a, b) => a.localeCompare(b));
      break;
    case SORT.length:
      sortedGoods.sort((a, b) => a.length - b.length);
      break;
    default:
      sortedGoods = goods;
  }

  if (reverse) {
    sortedGoods.reverse();
  }

  return sortedGoods;
};

export const App: React.FC = () => {
  const [sortType, setSortType] = useState<SORT>(SORT.none);
  const [sortReverse, setSortReverse] = useState<boolean>(false);

  const getButtonClass = (value: SORT): string => {
    return sortType === value ? '' : 'is-light';
  };

  const reset = () => {
    setSortType(SORT.none);
    setSortReverse(false);
  };

  const reverse = (status: boolean) => {
    setSortReverse(!status);
  };

  const goods = sortGoods([...goodsFromServer], sortType, sortReverse);

  return (
    <div className="section content" id="main">
      <div className="buttons">
        <button
          type="button"
          onClick={() => setSortType(SORT.alphabet)}
          className={`button is-info ${getButtonClass(SORT.alphabet)}`}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={() => setSortType(SORT.length)}
          className={`button is-success ${getButtonClass(SORT.length)}`}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={() => {
            reverse(sortReverse);
          }}
          className={`button is-warning ${sortReverse ? '' : 'is-light'}`}
        >
          Reverse
        </button>

        {(sortType || sortReverse) && (
          <button
            type="button"
            onClick={() => reset()}
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
