import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import { GoodList } from './components/GoodList/GoodList';

export enum Goods {
  Dumplings = 'Dumplings',
  Carrot = 'Carrot',
  Eggs = 'Eggs',
  IceCream = 'Ice cream',
  Apple = 'Apple',
  Bread = 'Bread',
  Fish = 'Fish',
  Honey = 'Honey',
  Jam = 'Jam',
  Garlic = 'Garlic',
}

export enum SortFild {
  alphabet = 'alphabet',
  length = 'length',
}

function getPreparedGoods(
  goods: Goods[],
  { sortField, reverse }: { sortField: SortFild | ''; reverse: boolean },
) {
  let preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortFild.alphabet:
          return good1.localeCompare(good2);
        case SortFild.length:
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  }

  if (reverse) {
    preparedGoods = preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const goods = Object.values(Goods);

  const [sortField, setSortField] = useState<SortFild | ''>('');
  const [reverse, setReverse] = useState(false);

  const visibleGoods = getPreparedGoods(goods, {
    sortField,
    reverse,
  });

  const toggleReverse = () => {
    setReverse(!reverse);
  };

  const reset = () => {
    setSortField('');
    setReverse(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortField !== SortFild.alphabet && 'is-light'}`}
          onClick={() => setSortField(SortFild.alphabet)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortField !== SortFild.length && 'is-light'}`}
          onClick={() => setSortField(SortFild.length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${!reverse && 'is-light'}`}
          onClick={toggleReverse}
        >
          Reverse
        </button>

        {sortField || reverse ? (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={reset}
          >
            Reset
          </button>
        ) : null}
      </div>

      <GoodList goods={visibleGoods} />
    </div>
  );
};
