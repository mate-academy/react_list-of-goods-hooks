import React, { useState } from 'react';
import cn from 'classnames';
import 'bulma/css/bulma.css';
import './App.scss';
import { Good } from './types/Good';
import { GoodList } from './components/GoodList/GoodList';

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

const goodsWithId = goodsFromServer.map((good, index) => ({
  id: index + 1,
  name: good,
}));

enum SortType {
  ALPHABET = 'alphabetically',
  LENGTH = 'byLength',
  DEFAULT = '',
}

interface Options {
  sortType: SortType;
  isReversed: boolean;
}

function getPreparedGoods(
  goods: Good[],
  { sortType, isReversed }: Options,
) {
  const preparedGoods = [...goods];

  preparedGoods.sort((good1, good2) => {
    const name1 = good1.name;
    const name2 = good2.name;

    switch (sortType) {
      case SortType.ALPHABET:
        return name1.localeCompare(name2);

      case SortType.LENGTH:
        return name1.length - name2.length;

      default:
        return 0;
    }
  });

  if (isReversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortType, setSortType] = useState(SortType.DEFAULT);
  const [isReversed, setIsReversed] = useState(false);
  const visibleGoods = getPreparedGoods(goodsWithId, { sortType, isReversed });

  function resetGoods() {
    setSortType(SortType.DEFAULT);
    setIsReversed(false);
  }

  function reverseGoods() {
    setIsReversed(prev => !prev);
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => setSortType(SortType.ALPHABET)}
          className={cn(
            ('button is-info'),
            ({ 'is-light': sortType !== SortType.ALPHABET }),
          )}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={() => setSortType(SortType.LENGTH)}
          className={cn(
            ('button is-success'),
            ({ 'is-light': sortType !== SortType.LENGTH }),
          )}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={reverseGoods}
          className={cn(
            ('button is-warning'),
            { 'is-light': !isReversed },
          )}
        >
          Reverse
        </button>

        {(sortType || isReversed) && (
          <button
            type="button"
            onClick={resetGoods}
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
