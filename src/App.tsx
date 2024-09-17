import React from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import { Button } from './components/Button';
import { Good } from './components/Good/Good';

enum SortType {
  alphabet = 'alphabet',
  length = 'length',
  default = '',
}

interface FilterParams {
  sortField: SortType;
  isReversed: boolean;
}

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

const filteringGoods = (
  goods: string[],
  { sortField, isReversed }: FilterParams,
) => {
  const goodsForFiltering = [...goods];

  goodsForFiltering.sort((good1, good2) => {
    switch (sortField) {
      case SortType.alphabet:
        return good1.localeCompare(good2);
      case SortType.length:
        return good1.length - good2.length;
      default:
        return 0;
    }
  });

  if (isReversed) {
    return goodsForFiltering.reverse();
  }

  return goodsForFiltering;
};

export const App: React.FC = () => {
  const [sortField, setSortField] = useState(SortType.default);
  const [isReversed, setIsReversed] = useState(false);

  const visibleGoods = filteringGoods(goodsFromServer, {
    sortField,
    isReversed,
  });

  const reverseState = () => {
    setIsReversed(prev => !prev);
  };

  const resetStates = () => {
    setSortField(SortType.default);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <Button
          click={() => setSortField(SortType.alphabet)}
          mainClass="is-info"
          condition={sortField !== SortType.alphabet}
          title="Sort alphabetically"
        />
        <Button
          click={() => setSortField(SortType.length)}
          mainClass="is-success"
          condition={sortField !== SortType.length}
          title="Sort by length"
        />
        <Button
          click={reverseState}
          mainClass="is-warning"
          condition={!isReversed}
          title="Reverse"
        />

        {(sortField || isReversed) && (
          <Button
            click={resetStates}
            mainClass="is-danger"
            condition
            title="Reset"
          />
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <Good key={good} good={good} />
        ))}
      </ul>
    </div>
  );
};
