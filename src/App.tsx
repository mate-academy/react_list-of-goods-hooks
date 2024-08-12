import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import { Good } from './types/Good';
import { Button } from './components/Button';
import { GoodList } from './components/GoodList';

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

enum SortBy {
  empty = '',
  alphabet = 'alphabet',
  length = 'length',
}

type FilterParams = {
  sortBy: SortBy;
  isReversed: boolean;
};

function prepareGoods(goods: Good[], { sortBy, isReversed }: FilterParams) {
  const preparedGoods = [...goods];

  if (sortBy) {
    preparedGoods.sort((good1, good2) => {
      switch (sortBy) {
        case SortBy.alphabet:
          return good1.localeCompare(good2);
        case SortBy.length:
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortBy, setSortBy] = useState(SortBy.empty);
  const [isReversed, setIsReversed] = useState(false);
  const preparedGoods = prepareGoods(goodsFromServer, { sortBy, isReversed });

  return (
    <div className="section content">
      <div className="buttons">
        <Button
          type="is-info"
          onClick={() => setSortBy(SortBy.alphabet)}
          isLight={sortBy !== SortBy.alphabet}
        >
          Sort alphabetically
        </Button>

        <Button
          type="is-success"
          onClick={() => setSortBy(SortBy.length)}
          isLight={sortBy !== SortBy.length}
        >
          Sort by length
        </Button>

        <Button
          type="is-warning"
          onClick={() => setIsReversed(cur => !cur)}
          isLight={!isReversed}
        >
          Reverse
        </Button>

        {(sortBy || isReversed) && (
          <Button
            type="is-danger"
            onClick={() => {
              setSortBy(SortBy.empty);
              setIsReversed(false);
            }}
            isLight={false}
          >
            Reset
          </Button>
        )}
      </div>

      <GoodList goods={preparedGoods} />
    </div>
  );
};
