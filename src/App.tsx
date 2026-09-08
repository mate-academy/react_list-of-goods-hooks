import React from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import cn from 'classnames';
import { GoodList } from './GoodList/GoodList';
import { sortByParam } from './utils';
import { IsActive } from './types';

export const goodsFromServer: string[] = [
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
  const [sortByAlphabet, setSortByAlphabet] = useState<IsActive>('inactive');
  const [sortByLength, setSortByLength] = useState<IsActive>('inactive');
  const [reverseArr, setReverseArr] = useState<IsActive>('inactive');
  const isResetActive =
    sortByAlphabet !== 'inactive' ||
    sortByLength !== 'inactive' ||
    reverseArr !== 'inactive';
  const calculatedGoods = sortByParam(goodsFromServer, {
    byAlphabet: sortByAlphabet,
    byLength: sortByLength,
    reverse: reverseArr,
  });

  function handleSortByAlphabet(value: IsActive) {
    setSortByAlphabet(value);
    setSortByLength('inactive');
  }

  function handleSortByLength(value: IsActive) {
    setSortByLength(value);
    setSortByAlphabet('inactive');
  }

  function handleReverse(value: IsActive) {
    setReverseArr(value);
  }

  function handleReset() {
    setSortByAlphabet('inactive');
    setSortByLength('inactive');
    setReverseArr('inactive');
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortByAlphabet !== 'active',
          })}
          onClick={() => handleSortByAlphabet('active')}
        >
          Sort alphabetically
        </button>
        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortByLength !== 'active',
          })}
          onClick={() => handleSortByLength('active')}
        >
          Sort by length
        </button>
        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': reverseArr !== 'active',
          })}
          onClick={() =>
            handleReverse(reverseArr === 'active' ? 'inactive' : 'active')
          }
        >
          Reverse
        </button>
        {(sortByAlphabet !== 'inactive' ||
          sortByLength !== 'inactive' ||
          reverseArr !== 'inactive') && (
          <button
            type="button"
            className={cn('button is-danger', {
              'is-light': !isResetActive,
            })}
            onClick={handleReset}
          >
            Reset
          </button>
        )}
      </div>
      <ul>
        <GoodList goods={calculatedGoods} />
      </ul>
    </div>
  );
};
