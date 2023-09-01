/* eslint-disable max-len */
import React, { useState } from 'react';
import cn from 'classnames';
import 'bulma/css/bulma.css';
import './App.scss';
import { variables } from './variables/sortBy';

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
  const [goodsArr, setGoodsArr] = useState(goodsFromServer);
  const [sortValue, setSortValue] = useState('');
  const [reverseValue, setReverseValue] = useState(false);
  const [resetValue, setResetValue] = useState(false);

  const sortBy = (value: string) => {
    if (value === variables.sort_by_alphabetically) {
      if (reverseValue) {
        setGoodsArr(prevState => [...prevState].sort((a, b) => b.localeCompare(a)));
      } else {
        setGoodsArr(prevState => [...prevState].sort((a, b) => a.localeCompare(b)));
      }

      setSortValue(variables.sort_by_alphabetically);
      setResetValue(true);

      return;
    }

    if (reverseValue) {
      setGoodsArr(prevState => [...prevState].sort((a, b) => b.length - a.length));
    } else {
      setGoodsArr(prevState => [...prevState].sort((a, b) => a.length - b.length));
    }

    setSortValue(variables.sort_by_length);
    setResetValue(true);
  };

  const reset = () => {
    setGoodsArr(goodsFromServer);
    setReverseValue(false);
    setResetValue(false);
    setSortValue('');
  };

  const reverse = () => {
    if (!sortValue) {
      setResetValue(!resetValue);
    } else {
      setResetValue(true);
    }

    setGoodsArr(prevState => [...prevState].reverse());
    setReverseValue(!reverseValue);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortValue !== variables.sort_by_alphabetically,
          })}
          onClick={() => sortBy(variables.sort_by_alphabetically)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortValue !== variables.sort_by_length,
          })}
          onClick={() => sortBy(variables.sort_by_length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': !reverseValue,
          })}
          onClick={reverse}
        >
          Reverse
        </button>

        {resetValue && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={reset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goodsArr.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
