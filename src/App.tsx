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
  'alphabet',
  'length',
  'reverse',
  'reset',
}

// const SORT_FIELD_ALPHABETICALLY = 'alphabet';
// const SORT_FIELD_BY_LENGTH = 'length';
// // const SORT_FIELD_REVERSE = 'reverse';
// const SORT_FIELD_RESET = 'reset';

function sortGoods(goods: string[], sortField: SortType) {
  const result = [...goods];

  result.sort((good1: string, good2: string) => {
    switch (sortField) {
      case SortType.alphabet:
        return good1.localeCompare(good2);

      case SortType.length:
        return good1.length - good2.length;

      case SortType.reverse:
        return -1;

      case SortType.reset:
      default:
        return 0;
    }
  });

  // switch (sortField) {
  //   case SortType.alphabet:
  //     result.sort((good1, good2) => {
  //       return good1.localeCompare(good2);
  //     });
  //     break;

  //   case SortType.length:
  //     result.sort((good1, good2) => {
  //       return good1.length - good2.length;
  //     });
  //     break;

  //   case SortType.reverse:
  //     return result.reverse();

  //   case SortType.reset:
  //   default:
  //     result = [...goodsFromServer];
  // }

  return result;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState(SortType.reset);
  const [visibleGoods, setVisibleGoods] = useState([...goodsFromServer]);
  // const [isReverse, setIsReverse] = useState(false);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortField !== SortType.alphabet,
          })}
          onClick={() => {
            setSortField(SortType.alphabet);
            setVisibleGoods(sortGoods([...goodsFromServer], SortType.alphabet));
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortField !== SortType.length,
          })}
          onClick={() => {
            setSortField(SortType.length);
            setVisibleGoods(sortGoods([...goodsFromServer], SortType.length));
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': sortField !== SortType.reverse,
          })}
          onClick={() => {
            setSortField(SortType.reverse);
            setVisibleGoods(prev => [...prev].reverse());
          }}
        >
          Reverse
        </button>

        {JSON.stringify(visibleGoods) !== JSON.stringify(goodsFromServer) && (
          <button
            type="button"
            className="button is-danger"
            onClick={() => {
              setSortField(SortType.reset);
              setVisibleGoods([...goodsFromServer]);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
