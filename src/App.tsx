import React, { useState } from 'react';
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

type SortType = 'none' | 'alphabetically' | 'byLength';

export const App: React.FC = () => {
  const [sortType, setSortType] = useState<SortType>('none');
  const [isReversed, setIsReversed] = useState(false);

  const getSortedGoods = (): string[] => {
    const sorted = [...goodsFromServer];

    switch (sortType) {
      case 'alphabetically':
        sorted.sort((firstItem, secondItem) =>
          firstItem.localeCompare(secondItem),
        );
        break;
      case 'byLength':
        sorted.sort(
          (firstItem, secondItem) => firstItem.length - secondItem.length,
        );
        break;
    }

    return isReversed ? sorted.reverse() : sorted;
  };

  const goods = getSortedGoods();

  const isModified = sortType !== 'none' || isReversed;

  const buttonClass = (active: boolean, base: string) =>
    `button ${base} ${!active ? 'is-light' : ''}`;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          className={buttonClass(sortType === 'alphabetically', 'is-info')}
          onClick={() => setSortType('alphabetically')}
        >
          Sort alphabetically
        </button>

        <button
          className={buttonClass(sortType === 'byLength', 'is-success')}
          onClick={() => setSortType('byLength')}
        >
          Sort by length
        </button>

        <button
          className={buttonClass(isReversed, 'is-warning')}
          onClick={() => setIsReversed(prev => !prev)}
        >
          Reverse
        </button>

        {isModified && (
          <button
            className="button is-danger is-light"
            onClick={() => {
              setSortType('none');
              setIsReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
