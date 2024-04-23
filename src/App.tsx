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
    None = '',
    Alphabetic = 'alphabetic',
    Length = 'length',
  }

  const [sortMethod, setSortmethod] = useState<Sort>(Sort.None);
  const [isReversed, changeReverse] = useState(false);
  const goods = [...goodsFromServer];

  switch (sortMethod) {
    case Sort.Alphabetic:
      goods.sort((a, b) => a.localeCompare(b));
      break;

    case Sort.Length:
      goods.sort((a, b) => a.length - b.length);
      break;

    default:
      break;
  }

  if (isReversed) {
    goods.reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': Sort.Alphabetic !== sortMethod,
          })}
          onClick={() => {
            setSortmethod(Sort.Alphabetic);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': Sort.Length !== sortMethod,
          })}
          onClick={() => {
            setSortmethod(Sort.Length);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': !isReversed,
          })}
          onClick={() => changeReverse(!isReversed)}
        >
          Reverse
        </button>

        <button
          type="button"
          className="button is-danger is-light"
          style={{
            display: !isReversed && sortMethod === Sort.None ? 'none' : 'block',
          }}
          onClick={() => {
            setSortmethod(Sort.None);
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
