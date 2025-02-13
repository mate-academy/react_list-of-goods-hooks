import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import cn from 'classnames';
import './App.scss';
import { sortFieldNew } from '../constans';

export const goodsFromServer : string[] = [
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

type GoodsList = string[]
const goods = goodsFromServer;

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<string>('');
  const [reverse, setReverse] = useState<boolean>(false);

  const visibleGoods: GoodsList = getPrepareGoods(goods, sortField ,  reverse);

  function getPrepareGoods(goods: GoodsList, sortField: string  , reverse: boolean) {
    const new_goods : GoodsList = [...goods];
    if (sortField) {
      switch (sortField) {
        case sortFieldNew.sortA:
          new_goods.sort((good1, good2) : number => good1.localeCompare(good2));
          break;
        case sortFieldNew.sortL:
          new_goods.sort((good1, good2) : number => good1.length - good2.length);
          break;
      }
    }
    return reverse ? new_goods.reverse() : new_goods;
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => {
            setSortField(sortFieldNew.sortA);
          }}
          className={cn('button', 'is-info', {
            'is-light': sortField !== sortFieldNew.sortA,
          })}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={() => {
            setSortField(sortFieldNew.sortL);
          }}
          className={cn('button', 'is-success', {
            'is-light': sortField !== sortFieldNew.sortL,
          })}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={() => {
            setReverse(prev => !prev);
          }}
          className={cn('button', 'is-warning', {
            'is-light': !reverse,
          })}
        >
          Reverse
        </button>

        {(sortField || reverse) && (
          <button
            type="button"
            onClick={() => {
              setSortField('');
              setReverse(false);
            }}
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        <ul>
          {visibleGoods.map(good => (
            <li data-cy="Good">{good}</li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
