import React from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import cn from 'classnames';
import { GoodList } from './GoodList/GoodList';
import { sortByParam } from './utils';
import { SortType } from './types';

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
  const [sortByAlphabet, setSortByAlphabet] = useState<SortType>(
    SortType.Default,
  );
  const [sortByLength, setSortByLength] = useState<SortType>(SortType.Default);
  const [reverseArr, setReverseArr] = useState<SortType>(SortType.Default);
  const isResetActive =
    sortByAlphabet !== SortType.Default ||
    sortByLength !== SortType.Default ||
    reverseArr !== SortType.Default;
  const calculatedGoods = sortByParam(goodsFromServer, {
    byAlphabet: sortByAlphabet,
    byLength: sortByLength,
    reverse: reverseArr,
  });

  function handleSortByAlphabet(value: SortType) {
    setSortByAlphabet(value);
    setSortByLength(SortType.Default);
  }

  function handleSortByLength(value: SortType) {
    setSortByLength(value);
    setSortByAlphabet(SortType.Default);
  }

  function handleReverse(value: SortType) {
    setReverseArr(value);
  }

  function handleReset() {
    setSortByAlphabet(SortType.Default);
    setSortByLength(SortType.Default);
    setReverseArr(SortType.Default);
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortByAlphabet !== SortType.Alphabet,
          })}
          onClick={() => handleSortByAlphabet(SortType.Alphabet)}
        >
          Sort alphabetically
        </button>
        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortByLength !== SortType.Length,
          })}
          onClick={() => handleSortByLength(SortType.Length)}
        >
          Sort by length
        </button>
        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': reverseArr !== SortType.Reverse,
          })}
          onClick={() =>
            handleReverse(
              reverseArr === SortType.Reverse
                ? SortType.Default
                : SortType.Reverse,
            )
          }
        >
          Reverse
        </button>
        {(sortByAlphabet !== SortType.Default ||
          sortByLength !== SortType.Default ||
          reverseArr !== SortType.Default) && (
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
