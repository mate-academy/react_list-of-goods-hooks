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

enum SortType {
  byAlphabet = 'Sort alphabetically',
  byLength = 'Sort by length',
}

function getReadyGoods(
  goods: string[],
  sortField: string,
  isReverse: boolean,
) {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortType.byAlphabet:
          return good1.localeCompare(good2);

        case SortType.byLength:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  return isReverse
    ? preparedGoods.reverse()
    : preparedGoods;
}

function reset(
  setSortField: React.Dispatch<React.SetStateAction<string>>,
  setIsReverse: React.Dispatch<React.SetStateAction<boolean>>,
) {
  setSortField('');
  setIsReverse(false);
}

export const App : React.FC = () => {
  const [sortField, setSortField] = useState('');
  const [isReverse, setIsReverse] = useState(false);
  const visibleGoods = getReadyGoods(goodsFromServer, sortField, isReverse);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info',
            { 'is-light': sortField !== SortType.byAlphabet })}
          onClick={() => setSortField(SortType.byAlphabet)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success',
            { 'is-light': sortField !== SortType.byLength })}
          onClick={() => setSortField(SortType.byLength)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning',
            { 'is-light': !isReverse })}
          onClick={() => {
            setIsReverse(!isReverse);
          }}
        >
          IsReverse
        </button>

        {(sortField || isReverse) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              reset(setSortField, setIsReverse);
            }}
          >
            Reset
          </button>
        )}

      </div>

      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good" key={good}>{good}</li>))}
      </ul>
    </div>
  );
};
