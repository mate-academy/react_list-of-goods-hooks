import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';
import { Good } from './types/Good';
import { Fild } from './types/Fild';
import { IsReversed } from './types/IsReversed';

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

const SORT_BY_LENGTH = 'length';
const SORT_BY_ALPHABET = 'alphabet';

enum SortType {
  default = '',
  length = 'length',
  alphabet = 'alphabet',
}

function setOrder(goods: Good[], fild: Fild, revers: IsReversed): Good[] {
  const prepereGoods = [...goods];

  if (fild) {
    prepereGoods.sort((good1, good2) => {
      switch (fild) {
        case SORT_BY_LENGTH:
          return good1[fild] - good2[fild];

        case SORT_BY_ALPHABET:
          return good1.localeCompare(good2);

        default:
          return 0;
      }
    });
  }

  if (revers) {
    prepereGoods.reverse();
  }

  return prepereGoods;
}

export const App: React.FC = () => {
  const [fildOrder, setFildOrder] = useState<Fild>(SortType.default);
  const [isReversed, setIsReversed] = useState<IsReversed>(false);

  const handleReverseClick = () => {
    setIsReversed(prev => !prev);
  };

  const handleResetClick = () => {
    setIsReversed(false);
    setFildOrder(SortType.default);
  };

  const visiblGoods = setOrder(goodsFromServer, fildOrder, isReversed);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': fildOrder !== SortType.alphabet,
          })}
          onClick={() => setFildOrder(SortType.alphabet)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-info', {
            'is-light': fildOrder !== SortType.length,
          })}
          onClick={() => setFildOrder(SortType.length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-info', {
            'is-light': !isReversed,
          })}
          onClick={handleReverseClick}
        >
          Reverse
        </button>

        {(fildOrder || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleResetClick}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visiblGoods.map(good => (
          <li
            data-cy="Good"
            key={good}
          >
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
