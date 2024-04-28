import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import cn from 'classnames';

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

enum SortField {
  Name = 'name',
  Length = 'length',
  NoField = '',
}

type SortProps = {
  sortField: SortField;
  reversed: boolean;
};

function getVisibleGoods(goods: string[], { sortField, reversed }: SortProps) {
  let result = [...goods];

  if (sortField) {
    switch (sortField) {
      case SortField.Name:
        result = result.sort();
        break;
      case SortField.Length:
        result = result.sort((good1, good2) => good1.length - good2.length);
        break;
      default:
        break;
    }
  }

  if (reversed) {
    result.reverse();
  }

  return result;
}

export const App = () => {
  const [sortField, setSortField] = useState(SortField.NoField);
  const [reversed, setReversed] = useState(false);

  const visibleGoods = getVisibleGoods(goodsFromServer, {
    sortField,
    reversed,
  });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${cn({ 'is-light': sortField !== SortField.Name })}`}
          onClick={() => setSortField(SortField.Name)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${cn({ 'is-light': sortField !== SortField.Length })}`}
          onClick={() => setSortField(SortField.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${cn({ 'is-light': !reversed })}`}
          onClick={() => {
            setReversed(!reversed);
          }}
        >
          Reverse
        </button>

        {sortField || reversed ? (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortField(SortField.NoField);
              setReversed(false);
            }}
          >
            Reset
          </button>
        ) : null}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
