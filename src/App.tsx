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
  nome = '',
}

function getPreparedGoods(
  goods: Goods[],
  { sortField, isReversed }: { sortField: SortFild | ''; isReversed: boolean },
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

  if (isReversed) {
    preparedGoods = preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const goods = Object.values(Goods);

  const [sortField, setSortField] = useState<SortFild>(SortFild.nome);
  const [isReversed, setReverse] = useState(false);

  const visibleGoods = getPreparedGoods(goods, {
    sortField,
    isReversed,
  });

  const toggleReverse = () => {
    setReverse(!isReversed);
  };

  const reset = () => {
    setSortField(SortFild.nome);
    setReverse(false);
  };

  const getClassIslight = (SortFildKey: SortFild) => {
    return `button ${sortField !== SortFildKey && 'is-light'}`;
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`is-info ${getClassIslight(SortFild.alphabet)}`}
          onClick={() => setSortField(SortFild.alphabet)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`is-success ${getClassIslight(SortFild.length)}`}
          onClick={() => setSortField(SortFild.length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${!isReversed && 'is-light'}`}
          onClick={toggleReverse}
        >
          Reverse
        </button>

        {(sortField || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={reset}
          >
            Reset
          </button>
        )}
      </div>

      <GoodList goods={visibleGoods} />
    </div>
  );
};
