import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';

enum SortBy {
  alph = 'alph',
  size = 'length',
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

function sortGoods(
  goods: string[],
  sortedField: SortBy | null,
  reversed: boolean,
): string[] {
  goods.sort((a, b) => {
    switch (sortedField) {
      case SortBy.alph:
        return a.localeCompare(b);
      case SortBy.size:
        return a.length - b.length;
      default:
        return 0;
    }
  });

  if (reversed) {
    goods.reverse();
  }

  return goods;
}

export const App: React.FC = () => {
  const [sortedField, setSortedField] = useState<SortBy | null>(null);
  const [reversed, setReversed] = useState(false);

  let goods = sortGoods([...goodsFromServer], sortedField, reversed);

  function resetSortedGoods() {
    setSortedField(null);
    setReversed(false);
    goods = [...goodsFromServer];
  }

  function changeGoods(field: SortBy) {
    setSortedField(field);
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn({
            button: true,
            'is-info': true,
            'is-light': SortBy.alph !== sortedField,
          })}
          onClick={() => changeGoods(SortBy.alph)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn({
            button: true,
            'is-success': true,
            'is-light': SortBy.size !== sortedField,
          })}
          onClick={() => changeGoods(SortBy.size)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn({
            button: true,
            'is-warning': true,
            'is-light': !reversed,
          })}
          onClick={() => setReversed(!reversed)}
        >
          Reverse
        </button>

        {(sortedField || reversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={resetSortedGoods}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
