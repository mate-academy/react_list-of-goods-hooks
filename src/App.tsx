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

type Goods = string[];
enum SortType {
  SortAlphabetically = 'Sort alphabetically',
  SortByLength = 'Sort by length',
}
type Props = {
  sortField: string;
  reversed: boolean;
};

function sortGoods(goods: Goods, { sortField, reversed }: Props) {
  let prepareGoods = [...goods];

  if (sortField) {
    prepareGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortType.SortByLength:
          return good1.length - good2.length;
        case SortType.SortAlphabetically:
          return good1.localeCompare(good2);
        default:
          return 0;
      }
    });
  }

  if (reversed) {
    prepareGoods = prepareGoods.reverse();
  }

  return prepareGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState('');
  const [reversed, setReversed] = useState(false);
  const reset = () => {
    setSortField('');
    setReversed(false);
  };

  const visibleGoods = sortGoods(goodsFromServer, {
    sortField,
    reversed,
  });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField(SortType.SortAlphabetically)}
          type="button"
          className={
            sortField === SortType.SortAlphabetically
              ? 'button is-info'
              : 'button is-info is-light'
          }
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField(SortType.SortByLength)}
          type="button"
          className={
            sortField === SortType.SortByLength
              ? 'button is-success'
              : 'button is-success is-light'
          }
        >
          Sort by length
        </button>

        <button
          onClick={() => setReversed(!reversed)}
          type="button"
          className={
            reversed ? 'button is-warning' : 'button is-warning is-light'
          }
        >
          Reverse
        </button>

        {(sortField || reversed) && (
          <button
            onClick={reset}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
