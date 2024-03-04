import React, { useState } from 'react';
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

enum SortType {
  Alphabet = 'Alphabet',
  Length = 'Length',
  Default = '',
}

function prepareGoods(goods: string[], type: SortType, reverse: boolean) {
  const preparedGoods = [...goods];

  preparedGoods.sort((good1, good2) => {
    switch (type) {
      case SortType.Alphabet:
        return good1.localeCompare(good2);
      case SortType.Length:
        return good1.length - good2.length;
      default:
        return 0;
    }
  });

  if (reverse) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortQuery, setSortQuery] = useState<SortType>(SortType.Default);
  const [reversed, setReversed] = useState(false);

  const sortedGoods = prepareGoods(goodsFromServer, sortQuery, reversed);

  const isChanged = sortQuery || reversed;

  const resetFilter = () => {
    setSortQuery(SortType.Default);
    setReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortQuery === SortType.Alphabet || 'is-light'}`}
          onClick={() => setSortQuery(SortType.Alphabet)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortQuery === SortType.Length || 'is-light'}`}
          onClick={() => setSortQuery(SortType.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${reversed || 'is-light'}`}
          onClick={() => setReversed(!reversed)}
        >
          Reverse
        </button>

        {isChanged && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={resetFilter}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {sortedGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
