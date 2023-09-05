import React, { useState } from 'react';
import cn from 'classnames';

import 'bulma/css/bulma.css';
import './App.scss';

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

enum SortField {
  Default = '',
  Alphabet = 'alphabet',
  Length = 'length',
}
type GoodWithId = {
  product: string,
  id: number,
};

function getGoodsWithId(goods: string[]): GoodWithId[] {
  return goods.map((product, index) => ({ product, id: index + 1 }));
}

const goodsWithId = getGoodsWithId(goodsFromServer);

type SortCallback = (goodA: GoodWithId, goodB: GoodWithId) => number;
function getSortCallback(sortField: SortField): SortCallback {
  return (goodA: GoodWithId, goodB: GoodWithId) => {
    switch (sortField) {
      case SortField.Alphabet:
        return goodA.product.localeCompare(goodB.product);

      case SortField.Length:
        return goodA.product.length - goodB.product.length;

      default:
        return 0;
    }
  };
}

function getSortedGoods(
  goods: GoodWithId[],
  sortField: SortField,
  isReversed: boolean,
): GoodWithId[] {
  const goodsCopy = [...goods];

  goodsCopy.sort(getSortCallback(sortField));

  if (isReversed) {
    goodsCopy.reverse();
  }

  return goodsCopy;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortField>(SortField.Default);
  const [isReversed, setIsReversed] = useState(false);
  const sortedGoods = getSortedGoods(goodsWithId, sortField, isReversed);

  const isChanged = () => Boolean(sortField) || isReversed;
  const resetFilterOptions = (): void => {
    setSortField(SortField.Default);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': SortField.Alphabet !== sortField,
          })}
          onClick={() => setSortField(SortField.Alphabet)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': SortField.Length !== sortField,
          })}
          onClick={() => setSortField(SortField.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': !isReversed,
          })}
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>

        {isChanged() && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={resetFilterOptions}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {sortedGoods.map(({ product, id }) => (
          <li data-cy="Good" key={id}>{product}</li>
        ))}
      </ul>
    </div>
  );
};
