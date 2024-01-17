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

enum SortType {
  Alphabetically = 'Alphabetically',
  Length = 'Length',
  Default = '',
}

type Props = {
  visibleGoods: string[],
};

// const SORT_FIELD_ALPHABETICALLY = 'Alphabetically';
// const SORT_FIELD_LENGTH = 'Length';

function getPrepareGoods(
  goods: string[],
  { sortField, reverse }: { sortField: SortType, reverse: boolean },
) {
  const prepareGoods = [...goods];

  if (sortField) {
    prepareGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortType.Alphabetically:
          return good1.localeCompare(good2);

        case SortType.Length:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (reverse) {
    prepareGoods.reverse();
  }

  return prepareGoods;
}

export const GoodsList: React.FC<Props> = ({ visibleGoods }) => (
  <ul>
    {visibleGoods.map(good => (
      <li key={good} data-cy="Good">{good}</li>
    ))}
  </ul>
);

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortType>(SortType.Default);
  const [reverse, setReverse] = useState(false);

  const visibleGoods = getPrepareGoods(goodsFromServer, { sortField, reverse });

  const resetGoods = () => {
    setSortField(SortType.Default);
    setReverse(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField(SortType.Alphabetically)}
          type="button"
          className={`button is-info ${cn({ 'is-light': sortField !== SortType.Alphabetically })}`}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField(SortType.Length)}
          type="button"
          className={`button is-success ${cn({ 'is-light': sortField !== SortType.Length })}`}
        >
          Sort by length
        </button>

        <button
          onClick={() => setReverse(!reverse)}
          type="button"
          className={`button is-warning ${cn({ 'is-light': !reverse })}`}
        >
          Reverse
        </button>

        {(sortField || reverse) && (
          <button
            onClick={resetGoods}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <GoodsList visibleGoods={visibleGoods} />

    </div>
  );
};
