import React from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';
import { useState } from 'react';

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
  const [sortField, setSortField] = useState<string>('');
  const [reversed, setReversed] = useState<boolean>(false);
  const isSorting: boolean = reversed || sortField !== '';

  function getsortedFields(goods: string[], field: string, reverse: boolean) {
    let preparedGoods = [...goods];

    switch (field) {
      case 'Sort alphabetically':
        preparedGoods.sort((x, y) => x.localeCompare(y));
        break;
      case 'Sort by length':
        preparedGoods.sort((x, y) => x.length - y.length);
        break;
      default:
        break;
    }

    if (reverse) {
      preparedGoods = preparedGoods.toReversed();
    }

    return preparedGoods;
  }

  const visibleGoods = getsortedFields(goodsFromServer, sortField, reversed);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortField !== 'Sort alphabetically',
          })}
          onClick={() => {
            setSortField('Sort alphabetically');
            setReversed(false);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortField !== 'Sort by length',
          })}
          onClick={() => {
            setSortField('Sort by length');
            setReversed(false);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': reversed !== true,
          })}
          onClick={() => {
            setReversed(prev => !prev);
          }}
        >
          Reverse
        </button>

        {isSorting && (
          <button
            style={{ display: 'block' }}
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortField('');
              setReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
