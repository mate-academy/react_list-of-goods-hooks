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
  EMPTY = '',
  ABC = 'alphabetically',
  LENGTH = 'length',
}

type Goods = string[];

export const App: React.FC = () => {
  const [sortGoods, setSortGoods] = useState<SortType>(SortType.EMPTY);
  const [reverse, setReverse] = useState(false);
  const [actualGoods, setActualGoods] = useState(goodsFromServer);

  function changeActualGoods(
    actual: Goods,
    { sort, isReverse, reset }:
    { sort?: SortType, isReverse?: boolean, reset?: boolean },
  ) {
    const preparedGoods = [...actual];

    if (reset) {
      setActualGoods(actual);
      setSortGoods(SortType.EMPTY);
      setReverse(false);

      return actual;
    }

    if (sort) {
      preparedGoods.sort((good1, good2) => {
        switch (sort) {
          case SortType.ABC:
            setSortGoods(SortType.ABC);

            return good1.localeCompare(good2);

          case SortType.LENGTH:
            setSortGoods(SortType.LENGTH);

            return good1.length - good2.length;

          default:
            return 0;
        }
      });
    }

    if (isReverse) {
      preparedGoods.reverse();
    }

    setActualGoods(preparedGoods);

    return preparedGoods;
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={
            cn('button is-info', { 'is-light': sortGoods !== SortType.ABC })
          }
          onClick={() => changeActualGoods(
            goodsFromServer,
            { sort: SortType.ABC, isReverse: reverse },
          )}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={
            cn('button is-success', {
              'is-light': sortGoods !== SortType.LENGTH,
            })
          }
          onClick={() => changeActualGoods(
            goodsFromServer,
            { sort: SortType.LENGTH, isReverse: reverse },
          )}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={
            cn('button is-warning', { 'is-light': reverse === false })
          }
          onClick={() => {
            setReverse(previous => !previous);

            changeActualGoods(
              goodsFromServer,
              { sort: sortGoods, isReverse: !reverse },
            );
          }}
        >
          Reverse
        </button>

        {JSON.stringify(actualGoods) !== JSON.stringify(goodsFromServer) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setActualGoods(
                changeActualGoods(goodsFromServer, { reset: true }),
              );
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        <ul>
          {actualGoods.map(good => <li key={good} data-cy="Good">{good}</li>)}
        </ul>
      </ul>
    </div>
  );
};
