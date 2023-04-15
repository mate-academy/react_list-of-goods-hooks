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

type ReorderOptions = {
  reverse: boolean,
  type: number,
};

function ReorderGoods(goods: string[], { reverse, type }: ReorderOptions) {
  const initialGoods = [...goods];

  switch (type) {
    case 1:
      initialGoods.sort((a, b) => a.localeCompare(b));
      break;

    case 2:
      initialGoods.sort((a, b) => a.length - b.length);
      break;

    default:
      break;
  }

  if (reverse) {
    initialGoods.reverse();
  }

  return initialGoods;
}

export const App: React.FC = () => {
  const [type, useType] = useState(0);
  const [reverse, useReverse] = useState(false);

  function ChangeType(typeNum: number) {
    useType(typeNum);
  }

  function ChangeReverse(reverseType: boolean) {
    useReverse(reverseType);
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${type !== 1 ? 'is-light' : ''}`}
          onClick={() => ChangeType(1)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${type !== 2 ? 'is-light' : ''}`}
          onClick={() => ChangeType(2)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${!reverse ? 'is-light' : ''}`}
          onClick={() => ChangeReverse(!reverse)}
        >
          Reverse
        </button>

        {(reverse || type !== 0) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              ChangeReverse(false);
              ChangeType(0);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {ReorderGoods(goodsFromServer, { reverse, type }).map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
