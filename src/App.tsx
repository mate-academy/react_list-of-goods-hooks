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

type Goods = string[];

export const App: React.FC = () => {
  const goods = [...goodsFromServer];

  const [value, setValue] = useState(goods);
  const [typeOfSort, setTypeOfSort] = useState('NONE');
  const [isReversed, setRevers] = useState(false);
  const [isReseted, setReset] = useState(true);

  const lengthSort = (arr: Goods) => {
    setTypeOfSort('LENGTH');
    setRevers(false);
    setReset(false);

    return ([...arr].sort((g1,
      g2) => g1.length - g2.length));
  };

  const alphSort = (arr: Goods) => {
    setTypeOfSort('ALPH');
    setRevers(false);
    setReset(false);

    return ([...arr].sort((g1,
      g2) => g1.localeCompare(g2)));
  };

  const resetGoods = () => {
    setTypeOfSort('NONE');
    setValue(goods);
    setReset(true);
    setRevers(false);
  };

  const reverseGoods = (arr: Goods) => {
    setRevers(current => !current);
    setReset(false);

    return [...arr].reverse();
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames(
            'button',
            'is-info',
            { 'is-light': typeOfSort !== 'ALPH' },
          )}
          onClick={() => setValue(alphSort(value))}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames(
            'button',
            'is-success',
            { 'is-light': typeOfSort !== 'LENGTH' },
          )}
          onClick={() => setValue(lengthSort(value))}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames(
            'button',
            'is-warning',
            { 'is-light': !isReversed },
          )}
          onClick={() => setValue(reverseGoods(value))}
        >
          Reverse
        </button>

        {!isReseted
          && (
            <button
              type="button"
              className="button is-danger is-light"
              onClick={() => resetGoods()}
            >
              Reset
            </button>
          )}

      </div>

      <ul>
        <ul>
          {value.map(good => (
            <li key={good} data-cy="Good">{good}</li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
