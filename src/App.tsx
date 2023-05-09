import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import classNames from 'classnames';

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
  // eslint-disable-next-line
  let [ value, setValue ] = useState('');
  // eslint-disable-next-line
  let [reverse, setReverse] = useState(false);

  function getGoods(
    goods:string[],
    sortValue:string,
    reverseValue:boolean,
  ) {
    const newGoods = [...goods];

    newGoods.sort((a, b) => {
      switch (sortValue) {
        case ('alphabetically'):
          return a.localeCompare(b);

        case ('length'):
          return a.length - b.length;

        default:
          return 0;
      }
    });

    if (reverseValue) {
      newGoods.reverse();
    }

    return newGoods;
  }

  const goods = getGoods(goodsFromServer, value, reverse);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames(
            'button',
            'is-info',
            { 'is-light': value !== 'alphabetically' },
          )}
          onClick={() => {
            setValue(value = 'alphabetically');
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames(
            'button',
            'is-success',
            { 'is-light': value !== 'length' },
          )}
          onClick={() => {
            setValue(value = 'length');
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames(
            'button',
            'is-warning',
            { 'is-light': reverse !== true },
          )}
          onClick={() => {
            setReverse(reverse = !reverse);
          }}
        >
          Reverse
        </button>

        {value || reverse ? (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setValue(value = '');
              setReverse(reverse = false);
            }}
          >
            Reset
          </button>
        ) : (
          <></>
        )}
      </div>

      <ul>
        <ul>
          {goods.map(good => (
            <li data-cy="Good">{good}</li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
