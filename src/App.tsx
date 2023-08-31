/* eslint-disable max-len */
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
  const [goodsArr, setGoodsArr] = useState(goodsFromServer);
  const [sortValue, setSortValue] = useState('');
  const [reverseValue, setReverseValue] = useState(false);
  const [resetValue, setResetValue] = useState(false);

  const SORT_BY_ALPHABETICALLY = 'alphabetically';
  const SORT_BY_LENGTH = 'length';

  const sortBy = (value: string) => {
    if (value === SORT_BY_ALPHABETICALLY) {
      if (reverseValue) {
        setGoodsArr(prevState => [...prevState].sort((a, b) => b.localeCompare(a)));
      } else {
        setGoodsArr(prevState => [...prevState].sort((a, b) => a.localeCompare(b)));
      }

      setSortValue(SORT_BY_ALPHABETICALLY);
      setResetValue(true);

      return;
    }

    if (value === SORT_BY_LENGTH) {
      if (reverseValue) {
        setGoodsArr(prevState => [...prevState].sort((a, b) => b.length - a.length));
      } else {
        setGoodsArr(prevState => [...prevState].sort((a, b) => a.length - b.length));
      }

      setSortValue(SORT_BY_LENGTH);
      setResetValue(true);

      return;
    }

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
            'is-light': sortValue !== SORT_BY_ALPHABETICALLY,
          })}
          onClick={() => sortBy(SORT_BY_ALPHABETICALLY)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortValue !== SORT_BY_LENGTH,
          })}
          onClick={() => sortBy(SORT_BY_LENGTH)}
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
            onClick={() => sortBy('')}
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
