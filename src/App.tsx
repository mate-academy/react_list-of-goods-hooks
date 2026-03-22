import React from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';
import { useState } from 'react';

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

enum SortType {
  alph = 'alphabetically',
  length = 'length'
}

function isEquial(optionsA: string[], optionsb: string[]) {
  return JSON.stringify(optionsA) === JSON.stringify(optionsb);
}

export const App: React.FC = () => {
  const [sortOption, setSortOption] = useState<SortType | null>(null);
  const [isReversed, setIsReversed] = useState(false);

  const copiedGoods = [...goodsFromServer];
  const sortedGoods = copiedGoods.sort((a, b) => {
    const actionsByOption = {
      [SortType.alph]: (optionA: string, optionB: string) => optionA.localeCompare(optionB),
      [SortType.length]: (optionA: string, optionB: string) => optionA.length - optionB.length,
    };

    if (sortOption) {
      return actionsByOption[sortOption](a, b);
    }

    return 0;
  });

  const goodsToShow = isReversed ? sortedGoods.reverse() : sortedGoods;

  const handleSetSort = (option: SortType) => {
    if (sortOption !== option) {
      setSortOption(option);
    }
  };

  const handleReset = () => {
    setSortOption(null);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortOption !== SortType.alph,
          })}
          onClick={() => handleSetSort(SortType.alph)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortOption !== SortType.length,
          })}
          onClick={() => handleSetSort(SortType.length,)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-info', {
            'is-light': !isReversed,
          })}
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>
        {!isEquial(goodsFromServer, goodsToShow) && (
          <button
            type="button"
            className={cn('button is-info is-light')}
            onClick={handleReset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goodsToShow.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
