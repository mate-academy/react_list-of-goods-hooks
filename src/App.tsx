import React, { useState } from 'react';
import cn from 'classnames';
import 'bulma/css/bulma.css';

import { SortType } from './types/SortType';
import { prepareGoods } from './utils/prepareGoods';

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
  const [condition, setCondition] = useState(SortType.DEFAULT);
  const [reversed, setReversed] = useState(false);

  const preparedGoods = prepareGoods(goodsFromServer, condition, reversed);

  const isAlphabetSelected = condition === SortType.ALPHABET;
  const isLengthSelected = condition === SortType.LENGTH;
  const isAnythingSelected = condition || reversed;

  const handleResetClick = () => {
    setCondition(SortType.DEFAULT);
    setReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': !isAlphabetSelected,
          })}
          onClick={() => setCondition(SortType.ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': !isLengthSelected,
          })}
          onClick={() => setCondition(SortType.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', { 'is-light': !reversed })}
          onClick={() => setReversed(!reversed)}
        >
          Reverse
        </button>

        {isAnythingSelected && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleResetClick}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        <ul>
          {preparedGoods.map(good => (
            <li data-cy="Good" key={good}>
              {good}
            </li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
