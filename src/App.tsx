import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
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
  SORT_ALPHABETICALLY = 'Sort alphabetically',
  SORT_BY_LENGTH = 'Sort by length',
  REVERSE = 'Reverse',
}

interface Props {
  sortField: string,
  isReversed: boolean
}

const getPreparedGoods = (
  goods: string[],
  { sortField, isReversed }: Props,
): string[] => {
  const preapredGoods = [...goods];

  if (sortField) {
    preapredGoods.sort((good1: string, good2: string): number => {
      switch (sortField) {
        case SortType.SORT_ALPHABETICALLY: {
          return good1.localeCompare(good2);
        }

        case SortType.SORT_BY_LENGTH:
          return good1.length - good2.length;

        default: {
          return 0;
        }
      }
    });
  }

  if (isReversed) {
    return preapredGoods.reverse();
  }

  return preapredGoods;
};

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  const visibleGoods = getPreparedGoods(
    goodsFromServer,
    { sortField, isReversed },
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => {
            setSortField(SortType.SORT_ALPHABETICALLY);
          }}
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortField !== SortType.SORT_ALPHABETICALLY,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => {
            setSortField(SortType.SORT_BY_LENGTH);
          }}
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortField !== SortType.SORT_BY_LENGTH,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={() => {
            setIsReversed((current) => {
              return !current;
            });
          }}
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': isReversed === false,
          })}
        >
          Reverse
        </button>

        {sortField || isReversed ? (
          <button
            onClick={() => {
              setSortField('');
              setIsReversed(false);
            }}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        ) : (
          null
        )}

      </div>

      {visibleGoods.map(item => (
        <ul key={item}>
          <li data-cy="Good">{item}</li>
        </ul>
      ))}
    </div>
  );
};
