import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';

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
  ALPHABETICALLY = 'alphabetically',
  SORT_BY_LENGTH = 'sortByLength',
}

function sortedGoodByType(goods: string[],
  sortType: string,
  isReversed: boolean): string[] {
  const copyGoods = [...goods];

  switch (sortType) {
    case SortType.ALPHABETICALLY:
      copyGoods.sort((good1, good2) => (
        good1.localeCompare(good2)
      ));
      break;

    case SortType.SORT_BY_LENGTH:
      copyGoods.sort((good1, good2) => (
        good1.length - good2.length
      ));
      break;

    default:
      break;
  }

  if (isReversed) {
    copyGoods.reverse();
  }

  return copyGoods;
}

export const App: React.FC = () => {
  const [sortType, setSortType] = useState<string>('');
  const [isReversed, setIsReversed] = useState(false);

  const preparedGoods = sortedGoodByType(goodsFromServer, sortType, isReversed);

  const resetAll = () => {
    setSortType('');
    setIsReversed(false);
  };

  const isButtonsActive = sortType || isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortType(SortType.ALPHABETICALLY)}
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortType !== SortType.ALPHABETICALLY,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortType(SortType.SORT_BY_LENGTH)}
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortType !== SortType.SORT_BY_LENGTH,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={() => setIsReversed(!isReversed)}
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !isReversed,
          })}
        >
          Reverse
        </button>

        {isButtonsActive && (
          <button
            onClick={resetAll}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        <ul>
          {preparedGoods.map(good => (
            <li key={good} data-cy="Good">{good}</li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
