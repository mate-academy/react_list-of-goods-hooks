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

export enum ButtonType {
  ALPHABET = 'is-info',
  LENGTH = 'is-success',
  REVERSE = 'is-warning',
  RESET = 'is-danger',
}

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

  switch (sortType) {
    case SortType.ALPHABET:
      visibleGoods.sort();
      break;
    case SortType.LENGTH:
      visibleGoods.sort((a, b) => a.length - b.length);
      break;
    default:
      // eslint-disable-next-line max-len
      throw new Error('Oi mate, there is a problem innit! Oh my giddy aunt, it seems that sorting buttons are discombobulated');
  }

  if (isReversed) {
    visibleGoods.reverse();
  }

  return visibleGoods;
}

export const App: React.FC = () => {
  const [isReversed, setIsReversed] = useState(false);
  const [sortType, setSortType] = useState(SortType.NONE);

  const sortABC = () => {
    setSortType(SortType.ALPHABET);
  };

  const sortByLength = () => {
    setSortType(SortType.LENGTH);
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
          type={ButtonType.ALPHABET}
          active={sortType !== SortType.ALPHABET}
          callback={sortABC}
        >
          Sort alphabetically
        </Button>

        <Button
          type={ButtonType.LENGTH}
          active={sortType !== SortType.LENGTH}
          callback={sortByLength}
        >
          Sort by length
        </Button>

        <Button
          type={ButtonType.REVERSE}
          active={!isReversed}
          callback={reverse}
        >
          Reverse
        </Button>

        {isChanged && (
          <Button
            type={ButtonType.RESET}
            active
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
