import React, { useState } from 'react';
import cn from 'classnames';
import 'bulma/css/bulma.css';
import './App.scss';

type Goods = string[];

enum SortTypes {
  ALPHABETICAL = 'ALPHABETICAL',
  LENGTH = 'LENGTH',
}

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

const sortByLength = (arr: Goods, isReversed: boolean) => {
  return arr.toSorted((a: string, b: string) => {
    if (isReversed) {
      return b.length - a.length;
    }

    return a.length - b.length;
  });
};

const sortAlphabetically = (arr: Goods, isReversed: boolean) => {
  if (isReversed) {
    return arr.toSorted().reverse();
  }

  return arr.toSorted();
};

export const App: React.FC = () => {
  const [goods, setGoods] = useState<Goods>(goodsFromServer);
  const [sorting, setSorting] = useState<SortTypes | null>(null);
  const [isReversed, setIsReveresed] = useState(false);

  const handleSortAlphabettically = () => {
    setGoods((g: Goods) => {
      return sortAlphabetically(g, isReversed);
    });
    setSorting(SortTypes.ALPHABETICAL);
  };

  const handleSortByLength = () => {
    setGoods((g: Goods) => {
      return sortByLength(g, isReversed);
    });
    setSorting(SortTypes.LENGTH);
  };

  const handleReverse = () => {
    setGoods((g: Goods) => {
      return [...g].reverse();
    });
    setIsReveresed(!isReversed);
  };

  const handleReset = () => {
    setGoods(goodsFromServer);
    setSorting(null);
    setIsReveresed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sorting !== SortTypes.ALPHABETICAL,
          })}
          onClick={handleSortAlphabettically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sorting !== SortTypes.LENGTH,
          })}
          onClick={handleSortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !isReversed,
          })}
          onClick={handleReverse}
        >
          Reverse
        </button>

        {(sorting || isReversed) && (
          <button
            type="button"
            className={cn('button', 'is-danger', 'is-light')}
            onClick={handleReset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        <ul>
          {goods.map(it => {
            return (
              <li key={it} data-cy="Good">
                {it}
              </li>
            );
          })}
        </ul>
      </ul>
    </div>
  );
};
