import React, { useState } from 'react';
import 'bulma/css/bulma.css';

import cn from 'classnames';

import './App.scss';
import { GoodList } from './components/GoodList';

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
  ALPHABET = 'ALPHABET',
  LENGTH = 'LENGTH',
  DEFAULT = '',
}

type FilterParams = {
  value: string[],
  typeSort: SortType,
  isReverse: boolean,
};

const sortAndReverseArray = ({ value, typeSort, isReverse }:
FilterParams): string[] => {
  let result: string[] = [...value];

  switch (typeSort) {
    case SortType.ALPHABET:
      result = result.sort((a, b) => a.localeCompare(b));
      break;
    case SortType.LENGTH:
      result = result.sort((a, b) => a.length - b.length);
      break;
    case SortType.DEFAULT:
    default:
      break;
  }

  if (isReverse) {
    result = [...result].reverse();
  }

  return result;
};

export const App: React.FC = () => {
  const [
    selectedGood,
    setSelectedGood,
  ] = useState<FilterParams['typeSort']>(SortType.DEFAULT);

  const [
    isReverse,
    setIsReverse,
  ] = useState<boolean>(false);

  const goodsArray = sortAndReverseArray({
    value: goodsFromServer,
    typeSort: selectedGood,
    isReverse,
  });

  const handleReverseClick = () => {
    setIsReverse(!isReverse);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => {
            setSelectedGood(SortType.ALPHABET);
          }}
          className={cn('button is-info', {
            'is-light': selectedGood !== SortType.ALPHABET,
          })}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={() => {
            setSelectedGood(SortType.LENGTH);
          }}
          className={cn('button is-success', {
            'is-light': selectedGood !== SortType.LENGTH,
          })}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={handleReverseClick}
          className={cn('button is-warning', {
            'is-light': isReverse,
          })}
        >
          Reverse
        </button>

        {(selectedGood === SortType.ALPHABET || selectedGood === SortType.LENGTH
        || isReverse)
        && (
          <button
            type="button"
            onClick={() => {
              setSelectedGood(SortType.DEFAULT);
              setIsReverse(false);
            }}
            className={cn('button is-danger', {
              'is-light': { isReverse },
            })}
          >
            Reset
          </button>
        )}
      </div>

      <GoodList
        goods={goodsArray}
      />
    </div>
  );
};
