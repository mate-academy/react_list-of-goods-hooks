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

enum SortBy {
  LENGTH = 'length',
  ALPHABET = 'alphabet',
  INITIAL = 'initial',
}

function getPrepareGoods(
  goods: string[],
  sortQuery: SortBy,
  isReversed: boolean,
): string[] {
  const prepareGoods = [...goods];

  if (sortQuery !== SortBy.INITIAL) {
    prepareGoods.sort((good1: string, good2: string) => {
      switch (sortQuery) {
        case SortBy.ALPHABET:
          return good1.localeCompare(good2);
        case SortBy.LENGTH:
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    prepareGoods.reverse();
  }

  return prepareGoods;
}

export const App: React.FC = () => {
  const [sortQuery, setSortQuery] = useState(SortBy.INITIAL);
  const [isReversed, setIsReversed] = useState(false);

  const goods = getPrepareGoods(goodsFromServer, sortQuery, isReversed);

  const sortGoodsAlphabetically = () => {
    setSortQuery(prev => {
      if (prev === SortBy.ALPHABET) {
        return SortBy.INITIAL;
      }

      return SortBy.ALPHABET;
    });
  };

  const sortGoodsByLength = () => {
    setSortQuery(prev => {
      if (prev === SortBy.LENGTH) {
        return SortBy.INITIAL;
      }

      return SortBy.LENGTH;
    });
  };

  const handleReset = () => {
    setIsReversed(false);
    setSortQuery(SortBy.INITIAL);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortQuery !== SortBy.ALPHABET,
            'is-active': sortQuery === SortBy.ALPHABET, // Marcação do botão ativo
          })}
          onClick={sortGoodsAlphabetically}
        >
          Sort alphabetically
        </button>
        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortQuery !== SortBy.LENGTH,
            'is-active': sortQuery === SortBy.LENGTH, // Marcação do botão ativo
          })}
          onClick={sortGoodsByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': !isReversed,
          })}
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>
        {(isReversed || sortQuery !== SortBy.INITIAL) && (
          <button
            type="button"
            className="button is-danger"
            onClick={handleReset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(good => {
          return (
            <li key={good} data-cy="Good">
              {good}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
