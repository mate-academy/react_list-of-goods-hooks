import React, { useState } from 'react';
import cn from 'classnames';
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

export const App: React.FC = () => {
  enum Sort {
    none = '',
    alph = 'alph',
    length = 'length',
  }

  const [sortMethod, setSortmethod] = useState<Sort>(Sort.none);
  const [isReverse, changeReverse] = useState(false);
  let goods = [...goodsFromServer];

  switch (sortMethod) {
    case Sort.none:
      goods = [...goodsFromServer];
      break;

    case Sort.alph:
      goods.sort((a, b) => a.localeCompare(b));
      break;

    case Sort.length:
      goods.sort((a, b) => a.length - b.length);
  }

  if (isReverse) {
    goods.reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-success', {
            'is-light': Sort.alph !== sortMethod,
          })}
          onClick={() => {
            setSortmethod(Sort.alph);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': Sort.length !== sortMethod,
          })}
          onClick={() => {
            setSortmethod(Sort.length);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': !isReverse,
          })}
          onClick={() => changeReverse(!isReverse)}
        >
          Reverse
        </button>

        <button
          type="button"
          className="button is-danger is-light"
          style={{
            display: !isReverse && sortMethod === Sort.none ? 'none' : 'block',
          }}
          onClick={() => {
            setSortmethod(Sort.none);
            changeReverse(false);
          }}
        >
          Reset
        </button>
      </div>

      <ul>
        <ul>
          {goods.map(good => (
            <li key={good} data-cy="Good">
              {good}
            </li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
