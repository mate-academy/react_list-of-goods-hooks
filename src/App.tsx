import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

import { SortType, Good } from './types';

export const goodsFromServer: Good[] = [
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
  const [originalList] = useState<Good[]>(goodsFromServer);
  const [currentList, setCurrentList] = useState<Good[]>(goodsFromServer);
  const [mode, setMode] = useState<SortType>(SortType.Default);
  const [reverse, setReverse] = useState<boolean>(false);

  const sortAlphabetically = () => {
    setMode(SortType.Alphabet);
    const sorted = [...originalList].sort((a, b) => a.localeCompare(b));

    setCurrentList(reverse ? sorted.reverse() : sorted);
  };

  const sortByLength = () => {
    setMode(SortType.Length);
    const sorted = [...originalList].sort((a, b) => a.length - b.length);

    setCurrentList(reverse ? sorted.reverse() : sorted);
  };

  const reverseList = () => {
    const newReverse = !reverse;

    setReverse(newReverse);

    let baseList: Good[];

    switch (mode) {
      case SortType.Alphabet:
        baseList = [...originalList].sort((a, b) => a.localeCompare(b));
        break;

      case SortType.Length:
        baseList = [...originalList].sort((a, b) => a.length - b.length);
        break;
      default:
        baseList = [...originalList];
    }

    setCurrentList(newReverse ? baseList.reverse() : baseList);
  };

  const resetList = () => {
    setCurrentList([...originalList]);
    setMode(SortType.Default);
    setReverse(false);
  };

  const getButtonClass = (
    buttonType: SortType | 'reverse' | 'reset',
  ): string => {
    switch (buttonType) {
      case SortType.Alphabet:
        return `button is-info ${mode === SortType.Alphabet ? '' : 'is-light'}`;
      case SortType.Length:
        return `button is-success ${mode === SortType.Length ? '' : 'is-light'}`;
      case 'reverse':
        return `button is-warning ${reverse ? '' : 'is-light'}`;
      case 'reset':
        return `button is-danger`;
      default:
        return 'button is-light';
    }
  };

  const showReset =
    JSON.stringify(currentList) !== JSON.stringify(originalList);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={getButtonClass(SortType.Alphabet)}
          onClick={sortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={getButtonClass(SortType.Length)}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={getButtonClass('reverse')}
          onClick={reverseList}
        >
          Reverse
        </button>

        {showReset && (
          <button
            type="button"
            className={getButtonClass('reset')}
            onClick={resetList}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {currentList.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
