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
  ALPHABETIC = 'alphabet',
  LENGTH = 'length',
}

const getGoods = (goods: string[], sortType: string, isReversed: boolean) => {
  const visibleGoods: string[] = [...goods];

  switch (sortType) {
    case SortType.ALPHABETIC:
      visibleGoods.sort((a, b) => a.localeCompare(b));
      break;
    case SortType.LENGTH:
      visibleGoods.sort((good1, good2) => {
        if (good1.length === good2.length) {
          return good1.localeCompare(good2);
        }

        return good1.length - good2.length;
      });
      break;
    default:
      break;
  }

  if (isReversed) {
    visibleGoods.reverse();
  }

  return visibleGoods;
};

export const App: React.FC = () => {
  const [sortType, setSortType] = useState<SortType | ''>('');
  const [isReversed, setIsReversed] = useState(false);

  const resetState = () => {
    setSortType('');
    setIsReversed(false);
  };

  const visibleGoods = getGoods(goodsFromServer, sortType, isReversed);

  const shouldReset = sortType || isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortType !== SortType.ALPHABETIC,
          })}
          onClick={() => {
            setSortType(SortType.ALPHABETIC);
          }}
        >
          Sort alphabetically
        </button>
        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortType !== SortType.LENGTH,
          })}
          onClick={() => {
            setSortType(SortType.LENGTH);
          }}
        >
          Sort by length
        </button>
        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !isReversed,
          })}
          onClick={() => {
            setIsReversed(!isReversed);
          }}
        >
          Reverse
        </button>
        {shouldReset && (
          <button
            type="button"
            className={cn('button', 'is-danger')}
            onClick={resetState}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
