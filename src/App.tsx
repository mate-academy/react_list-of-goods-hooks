import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';

type Good = string;

interface SortGoods {
  goods: Good[];
  sortType: string;
}

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

const SORT_FIELD_ALPHABET = 'alphabet';
const SORT_FIELD_LENGTH = 'length';

const getSortedGoods = ({ goods, sortType }: SortGoods): Good[] => {
  const prepearedGoods = [...goods];

  if (sortType) {
    prepearedGoods.sort((good1, good2) => {
      switch (sortType) {
        case SORT_FIELD_ALPHABET:
          return good1.localeCompare(good2);
        case SORT_FIELD_LENGTH:
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  }

  return prepearedGoods;
};

export const App: React.FC = () => {
  const [sortField, setSortField] = useState('');
  const [isReversed, setIsReversed] = useState(false);
  const visibleGoods = getSortedGoods({
    goods: goodsFromServer,
    sortType: sortField,
  });

  if (isReversed) {
    visibleGoods.reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortField !== SORT_FIELD_ALPHABET,
          })}
          onClick={() => {
            setSortField(SORT_FIELD_ALPHABET);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortField !== SORT_FIELD_LENGTH,
          })}
          onClick={() => {
            setSortField(SORT_FIELD_LENGTH);
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

        {(sortField !== '' || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortField('');
              setIsReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map((good: Good) => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
