import React, { useState } from 'react';
import cn from 'classnames';
import 'bulma/css/bulma.css';
import './App.scss';

type Good = string;
type IsReversed = true | false;
type PreparedGood = {
  id: string;
  name: string;
  length: number;
};

enum SortType {
  Initial = '',
  Alphabet = 'name',
  Length = 'length',
}

export const goodsFromServer: Good[] = [
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

function getPreparedGoods(
  goods: Good[],
  sortedBy: SortType,
  isReversed: IsReversed,
): PreparedGood[] {
  const preparedGoods: PreparedGood[] = goods.map((good) => ({
    id: crypto.randomUUID(),
    name: good,
    length: good.length,
  }));

  if (sortedBy) {
    preparedGoods.sort((goodFirst, goodSecond) => {
      switch (sortedBy) {
        case 'name':
          return goodFirst[sortedBy].localeCompare(goodSecond[sortedBy]);

        case 'length':
          return goodFirst[sortedBy] - goodSecond[sortedBy];

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
  const [sortedBy, setSortedBy] = useState<SortType>(SortType.Initial);
  const [isReversed, setIsReversed] = useState<IsReversed>(false);

  const resetBtnCondition = sortedBy || isReversed;

  const visibleGoods: PreparedGood[] = getPreparedGoods(
    goodsFromServer,
    sortedBy,
    isReversed,
  );

  const resetAllFilters = () => {
    setSortedBy(SortType.Initial);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortedBy !== SortType.Alphabet,
          })}
          onClick={() => setSortedBy(SortType.Alphabet)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortedBy !== SortType.Length,
          })}
          onClick={() => setSortedBy(SortType.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', { 'is-light': !isReversed })}
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>

        {resetBtnCondition && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={resetAllFilters}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        <ul>
          {visibleGoods.map((good) => (
            <li data-cy="Good" key={good.id}>
              {good.name}
            </li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
