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

export const App: React.FC = () => {
  enum SortType {
    ALPHABETICALLY,
    BY_LENGTH,
    RESET,
  }

  const [visibleList, setVisibleList] = useState<string[]>(goodsFromServer);
  const [isReversed, setIsReversed] = useState<boolean>(false);
  const [actualSortType, setActualSortType] = useState<SortType>(
    SortType.RESET,
  );

  const sortBy = (sortingType: SortType) => {
    let sortedList: string[] = [];

    switch (sortingType) {
      case SortType.ALPHABETICALLY:
        sortedList = [...goodsFromServer].sort((item1, item2) =>
          item1.localeCompare(item2),
        );
        break;
      case SortType.BY_LENGTH:
        sortedList = [...goodsFromServer].sort(
          (item1, item2) => item1.length - item2.length,
        );
        break;
      case SortType.RESET:
        sortedList = [...goodsFromServer];
        setIsReversed(false);
        break;
    }

    if (isReversed && sortingType !== SortType.RESET) {
      sortedList.reverse();
    }

    setVisibleList(sortedList);
    setActualSortType(sortingType);
  };

  const reverseList = () => {
    const reversedList = [...visibleList].reverse();

    setVisibleList(reversedList);
    setIsReversed(prev => !prev);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => sortBy(SortType.ALPHABETICALLY)}
          type="button"
          className={classNames('button', 'is-info', {
            'is-light': actualSortType !== SortType.ALPHABETICALLY,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => sortBy(SortType.BY_LENGTH)}
          type="button"
          className={classNames('button', 'is-success', {
            'is-light': actualSortType !== SortType.BY_LENGTH,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={reverseList}
          type="button"
          className={classNames('button', 'is-warning', {
            'is-light': !isReversed,
          })}
        >
          Reverse
        </button>

        {(actualSortType !== SortType.RESET || isReversed) && (
          <button
            onClick={() => sortBy(SortType.RESET)}
            type="button"
            className="button is-danger is-light"
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
