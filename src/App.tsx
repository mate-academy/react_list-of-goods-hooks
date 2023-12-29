import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import { GoodType } from './Types/GoodType';
import { GoodList } from './Components/GoodList/GoodList';

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
  alphabet = 'alphabet',
  length = 'length',
}

export interface ActionParams {
  sortCondition: string,
  reverseCondition: boolean,
}

function getPreparedGoods(
  goods: GoodType[],
  { sortCondition, reverseCondition }: ActionParams,
) {
  const preparedGoods = [...goods];

  if (sortCondition) {
    preparedGoods.sort((good1, good2) => {
      switch (sortCondition) {
        case SortType.alphabet:
          return good1.localeCompare(good2);
        case SortType.length:
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  }

  if (reverseCondition) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortCondition, setSortCondition] = useState('');
  const [reverseCondition, setReverseCondition] = useState(false);

  const visibleGoods = getPreparedGoods(
    goodsFromServer, { sortCondition, reverseCondition },
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => setSortCondition(SortType.alphabet)}
          className={`button is-info ${sortCondition === SortType.alphabet ? '' : 'is-light'}`}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={() => setSortCondition(SortType.length)}
          className={`button is-success ${sortCondition === SortType.length ? '' : 'is-light'}`}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={() => setReverseCondition(!reverseCondition)}
          className={`button is-warning ${reverseCondition === true ? '' : 'is-light'}`}
        >
          Reverse
        </button>

        {(sortCondition || reverseCondition) && (
          <button
            type="button"
            onClick={() => {
              setSortCondition('');
              setReverseCondition(false);
            }}
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <GoodList goods={visibleGoods} />

    </div>
  );
};
