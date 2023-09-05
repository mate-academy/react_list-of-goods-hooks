import 'bulma/css/bulma.css';
import cn from 'classnames';
import './App.scss';
import React, { useState } from 'react';

import { SortType } from './types/SortType';

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

function getPreparedGoods(
  goods: string[],
  sortType: SortType,
  reverseField: boolean,
): string[] {
  const preparedGoods = [...goods];

  if (sortType) {
    preparedGoods.sort((good1, good2) => {
      switch (sortType) {
        case SortType.Alphabet: {
          return good1.localeCompare(good2);
        }

        case SortType.Length: {
          return good1.length - good2.length;
        }

        default: {
          return 0;
        }
      }
    });
  }

  if (reverseField) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

type Props = {
  goods: string[];
};

export const GoodList: React.FC<Props> = ({ goods }) => (
  <ul>
    {goods.map(good => (
      <li
        data-cy="Good"
        key={good}
      >
        {good}
      </li>
    ))}
  </ul>
);

export const App: React.FC = () => {
  const [sortType, setSortType] = useState(SortType.Default);
  const [reverseField, setReverseField] = useState(false);
  const goods = getPreparedGoods(goodsFromServer, sortType, reverseField);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => setSortType(SortType.Alphabet)}
          className={cn('button', 'is-info',
            {
              'is-light': sortType !== SortType.Alphabet,
            })}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={() => setSortType(SortType.Length)}
          className={cn('button', 'is-info',
            {
              'is-light': sortType !== SortType.Length,
            })}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={() => setReverseField(!reverseField)}
          className={cn('button', 'is-info',
            {
              'is-light': !reverseField,
            })}
        >
          Reverse
        </button>

        {(sortType || reverseField) && (
          <button
            type="button"
            onClick={() => {
              setSortType(SortType.Default);
              setReverseField(false);
            }}
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <GoodList goods={goods} />
    </div>
  );
};
