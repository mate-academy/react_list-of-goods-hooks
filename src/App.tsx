import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';
import { EnumSort } from './Types/EnumSort';

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

function sortWithRevers(goods:string[], typeSort:EnumSort, reverse:boolean) {
  let cloneGoods = [...goods];

  switch (typeSort) {
    case EnumSort.ALFABET_SORT:
      cloneGoods.sort((a, b) => (a.localeCompare(b)));
      break;
    case EnumSort.WORD_LENGTH_SORT:
      cloneGoods.sort((a, b) => (a.length - b.length));
      break;
    default:
      cloneGoods = [...goods];
      break;
  }

  if (reverse) {
    cloneGoods.reverse();
  }

  return cloneGoods;
}

export const App: React.FC = () => {
  const [typeSort, setSort] = useState(EnumSort.DEFAULT);
  const [isReverse, setIsReverse] = useState(false);
  const visibleGoods = sortWithRevers(goodsFromServer, typeSort, isReverse);

  const reversList = () => (
    isReverse === false
      ? setIsReverse(true)
      : setIsReverse(false)
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info',
            { 'is-light': typeSort !== EnumSort.ALFABET_SORT })}
          onClick={() => setSort(EnumSort.ALFABET_SORT)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success',
            { 'is-light': typeSort !== EnumSort.WORD_LENGTH_SORT })}
          onClick={() => setSort(EnumSort.WORD_LENGTH_SORT)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', { 'is-light': !isReverse })}
          onClick={() => reversList()}

        >
          Reverse
        </button>
        {typeSort.length > 0 || isReverse
          ? (
            <button
              type="button"
              className="button is-danger is-light"
              onClick={() => {
                setSort(EnumSort.DEFAULT);
                setIsReverse(false);
              }}
            >
              Reset
            </button>
          ) : ''}

      </div>
      <ul>
        {visibleGoods.map(good => <li key={good} data-cy="Good">{good}</li>)}
      </ul>
    </div>
  );
};
