import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
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
  ALPHABETICAL = 'alphabetical',
  LENGTH = 'length',
  DEFAULT = '',
}

function updateState(sortState: string, goods: string[], isReverse: boolean) {
  let visibleGoods = [...goods];

  if (sortState) {
    visibleGoods = visibleGoods.toSorted((good1, good2) => {
      switch (sortState) {
        case SortType.ALPHABETICAL:
          return good1.localeCompare(good2);
        case SortType.LENGTH:
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  }

  if (isReverse) {
    visibleGoods = visibleGoods.reverse();
  }

  return visibleGoods;
}

export const App = () => {
  const [sortState, setSortState] = useState(SortType.DEFAULT);
  const [reversed, setReversed] = useState(false);

  const visibleGoods = updateState(sortState, goodsFromServer, reversed);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortState(SortType.ALPHABETICAL)}
          type="button"
          className={classNames('button is-info', {
            'is-light': sortState !== SortType.ALPHABETICAL,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortState(SortType.LENGTH)}
          type="button"
          className={classNames('button is-info', {
            'is-light': sortState !== SortType.LENGTH,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={() => setReversed(!reversed)}
          type="button"
          className={classNames('button is-warning', { 'is-light': !reversed })}
        >
          Reverse
        </button>

        {(sortState || reversed) && (
          <button
            onClick={() => {
              setReversed(false);
              setSortState(SortType.DEFAULT);
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
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
