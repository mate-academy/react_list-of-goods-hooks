import { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import classNames from 'classnames';

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
  none = '',
  alphabetically = 'alphabetically',
  bylength = 'bylength',
}

export const App: React.FC = () => {
  const [sort, setSort] = useState(SortType.none);
  const [reversed, setReversed] = useState(false);
  const goods = [...goodsFromServer];

  if (sort === SortType.alphabetically) {
    goods.sort((a, b) => a.localeCompare(b));
  }

  if (sort === SortType.bylength) {
    goods.sort((a, b) => a.length - b.length);
  }

  if (reversed) {
    goods.reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button', 'is-info', {
            'is-light': sort !== SortType.alphabetically,
          })}
          onClick={() => setSort(SortType.alphabetically)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button', 'is-success', {
            'is-light': sort !== SortType.bylength,
          })}
          onClick={() => setSort(SortType.bylength)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button', 'is-warning', {
            'is-light': !reversed,
          })}
          onClick={() => setReversed(!reversed)}
        >
          Reverse
        </button>

        {(sort || reversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSort(SortType.none);
              setReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
