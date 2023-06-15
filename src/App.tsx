import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import { Products } from './components/Products/Products';
import { Button } from './components/Button/Button';

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
  NONE,
  ALPHABET,
  LENGTH,
}

type ReorderOptions = {
  sortType: SortType,
  isReversed: boolean,
};

export function getReorderedGoods(
  goods: string[],
  { sortType, isReversed }: ReorderOptions,
) {
  const visibleGoods = [...goods];

  if (sortType === SortType.ALPHABET) {
    visibleGoods.sort();
  }

  if (sortType === SortType.LENGTH) {
    visibleGoods.sort((a, b) => a.length - b.length);
  }

  if (isReversed) {
    visibleGoods.reverse();
  }

  return visibleGoods;
}

export const App: React.FC = () => {
  const [isReversed, setIsReversed] = useState(false);
  const [sortType, setSortType] = useState(SortType.NONE);

  const sortGoods = (value: SortType) => {
    setSortType(sortType === value ? SortType.NONE : value);
  };

  const reverse = () => {
    setIsReversed(!isReversed);
  };

  const reset = () => {
    setIsReversed(false);
    setSortType(SortType.NONE);
  };

  const isChanged = isReversed || sortType !== SortType.NONE;

  return (
    <div className="App">
      <div className="buttons">
        <Button
          styles={{
            'is-info': true,
            'is-light': sortType !== SortType.ALPHABET,
          }}
          callback={() => {
            sortGoods(SortType.ALPHABET);
          }}
        >
          Sort alphabetically
        </Button>

        <Button
          styles={{
            'is-success': true,
            'is-light': sortType !== SortType.LENGTH,
          }}
          callback={() => {
            sortGoods(SortType.LENGTH);
          }}
        >
          Sort by length
        </Button>

        <Button
          styles={{
            'is-warning': true,
            'is-light': !isReversed,
          }}
          callback={reverse}
        >
          Reverse
        </Button>

        {isChanged && (
          <Button
            styles={{
              'is-danger': true,
              'is-light': true,
            }}
            callback={reset}
          >
            Reset
          </Button>
        )}

      </div>

      <Products
        products={getReorderedGoods(goodsFromServer, { isReversed, sortType })}
      />
    </div>
  );
};
