import React from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';

export enum SortType {
  Default = 'Default',
  Alphabetically = 'Alphabetically',
  Length = 'Length',
}

export type SortButton = {
  id: number;
  title: string;
  className: string;
  type: SortType | 'Reverse';
};

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

export const sortList: SortButton[] = [
  {
    id: 1,
    title: 'Sort alphabetically',
    className: 'is-info',
    type: SortType.Alphabetically,
  },
  {
    id: 2,
    title: 'Sort by length',
    className: 'is-success',
    type: SortType.Length,
  },
  {
    id: 3,
    title: 'Reverse',
    className: 'is-warning',
    type: 'Reverse',
  },
];

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortType>(SortType.Default);
  const [isReverse, setIsReverse] = useState<boolean>(false);

  let visibleList: string[];

  if (sortField === SortType.Default) {
    visibleList = [...goodsFromServer];
  } else {
    visibleList = [...goodsFromServer].sort((a, b) => {
      switch (sortField) {
        case SortType.Alphabetically:
          return a.localeCompare(b);
        case SortType.Length:
          return a.length - b.length;
        default:
          return 0;
      }
    });
  }

  if (isReverse) {
    visibleList.reverse();
  }

  const handleSort = (button: SortType | 'Reverse' | 'Reset') => {
    switch (button) {
      case 'Reverse':
        setIsReverse(prev => !prev);
        break;
      case 'Reset':
        setSortField(SortType.Default);
        setIsReverse(false);
        break;
      default:
        setSortField(button);
    }
  };

  const isOriginal =
    visibleList.length === goodsFromServer.length &&
    visibleList.every((v, i) => v === goodsFromServer[i]);

  return (
    <div className="section content">
      <div className="buttons">
        {sortList.map(button => (
          <button
            key={button.id}
            type="button"
            className={`button ${button.className} ${
              button.type === sortField ||
              (button.type === 'Reverse' && isReverse)
                ? ''
                : 'is-light'
            }`}
            onClick={() => handleSort(button.type)}
          >
            {button.title}
          </button>
        ))}

        {!isOriginal && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => handleSort('Reset')}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleList.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
