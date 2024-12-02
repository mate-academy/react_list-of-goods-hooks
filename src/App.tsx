import React from 'react';
import {useState} from 'react';
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

enum SortType {
  NONE = '',
  ALPHABET = 'alphabet',
  LENGTH = 'length',
}

function getPreparedGoods(goods: string[], sortParameter: SortType): string[] {
  if (sortParameter) {
    goods.sort((a, b) => {
      switch (sortParameter) {
        case SortType.ALPHABET:
          return a.localeCompare(b);
        case SortType.LENGTH:
          return a.length - b.length;
        default:
          return 0;
      }
    });
  }

  return goods;
}

export const App: React.FC = () => {
  const [isReversed, setIsReversed] = useState(false);
  const [sortParameter, setSortParameter] = useState(SortType.NONE);

  const goods = getPreparedGoods([...goodsFromServer], sortParameter);

  if (isReversed) {
    goods.reverse();
  }
  return (
    <div className="section content">
      <div className="buttons">
      <button
          onClick={() => {
            setSortParameter(SortType.ALPHABET);
          }}
          type="button"
          className={`button is-info ${sortParameter !== SortType.ALPHABET ? 'is-light' : ''}`}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => {
            setSortParameter(SortType.LENGTH);
          }}
          type="button"
          className={`button is-success ${sortParameter !== SortType.LENGTH ? 'is-light' : ''}`}
        >
          Sort by length
        </button>

        <button
          onClick={() => {
            setIsReversed(!isReversed);
          }}
          type="button"
          className={`button is-warning ${!isReversed ? 'is-light' : ''}`}
        >
          Reverse
        </button>

        {(sortParameter || isReversed) && (
          <button
            onClick={() => {
              setSortParameter(SortType.NONE);
              setIsReversed(false);
            }}
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
