import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

import Button from './components/Button';

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

const enum SortType {
  Alphabet = 'Alphabet',
  Length = 'Length',
  Default = '',
}

const normalizeGoods = (goods: string[], type: SortType, reversed: boolean) => {
  const compareGoods = (good1: string, good2: string) => {
    switch (type) {
      case SortType.Alphabet:
        return good1.localeCompare(good2);
      case SortType.Length:
        return good1.length - good2.length;
      default:
        return 0;
    }
  };

  const sortedGoods = [...goods].sort(compareGoods);

  return reversed ? sortedGoods.reverse() : sortedGoods;
};

export const App: React.FC = () => {
  const [sortType, setSortType] = useState<SortType>(SortType.Default);
  const [reversed, setReversed] = useState(false);

  const normalizedGoods = normalizeGoods(goodsFromServer, sortType, reversed);

  const isResetButtonVisible = sortType || reversed;

  const resetFilter = () => {
    setSortType(SortType.Default);
    setReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <Button
          active={sortType === SortType.Alphabet}
          styleClass="is-info"
          onClick={() => setSortType(SortType.Alphabet)}
        >
          Sort alphabetically
        </Button>

        <Button
          active={sortType === SortType.Length}
          styleClass="is-success"
          onClick={() => setSortType(SortType.Length)}
        >
          Sort by length
        </Button>

        <Button
          active={reversed}
          styleClass="is-warning"
          onClick={() => setReversed(!reversed)}
        >
          Reverse
        </Button>

        {isResetButtonVisible && (
          <Button styleClass="is-danger is-light" onClick={resetFilter}>
            Reset
          </Button>
        )}
      </div>

      <ul>
        {normalizedGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
