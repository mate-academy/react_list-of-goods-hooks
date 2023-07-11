import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import cn from 'classnames';
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
  None,
  Alphabet,
  Length,
}

type Goods = typeof goodsFromServer;

type PreparedGoodsOptions = {
  sortField: SortType,
  reversed: boolean,
};

function getPreparedGoods(
  goods: Goods,
  { sortField, reversed }: PreparedGoodsOptions,
) {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortType.Alphabet:
          return good1.localeCompare(good2);
        case SortType.Length:
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  }

  if (reversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState(SortType.None);
  const [reversed, setReversed] = useState(false);
  const visibleGoods = getPreparedGoods(
    goodsFromServer,
    { sortField, reversed },
  );

  const handleReverse = () => {
    setReversed(!reversed);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField(SortType.Alphabet)}
          type="button"
          className={cn('button', 'is-info',
            { 'is-light': sortField !== SortType.Alphabet })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField(SortType.Length)}
          type="button"
          className={cn('button', 'is-success',
            { 'is-light': sortField !== SortType.Length })}
        >
          Sort by length
        </button>

        <button
          onClick={handleReverse}
          type="button"
          className={cn('button', 'is-warning', { 'is-light': !reversed })}
        >
          Reverse
        </button>

        {(sortField || reversed)
          && (
            <button
              onClick={() => {
                setSortField(SortType.None);
                setReversed(false);
              }}
              type="button"
              className="button is-danger is-light"
            >
              Reset
            </button>
          )}
      </div>
      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good" key={good}>{good}</li>
        ))}
      </ul>
    </div>
  );
};
