import React from 'react';
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
  SortAlphabetically,
  SortByLength,
  Default,
}

function getGoods(goods: string[], sortGoods: SortType) {
  const preparedGoods = [...goods];

  if (sortGoods !== SortType.Default) {
    preparedGoods.sort((good1, good2) => {
      switch (sortGoods) {
        case SortType.SortAlphabetically:
          return good1.localeCompare(good2);

        case SortType.SortByLength:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortGoods, setSortGoods] = useState<SortType>(SortType.Default);
  let visibleGoods = getGoods(goodsFromServer, sortGoods);
  const [reversed, setReversed] = useState(false);

  if (reversed) {
    visibleGoods = visibleGoods.toReversed();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button', 'is-info', {
            'is-light': sortGoods !== SortType.SortAlphabetically,
          })}
          onClick={() => setSortGoods(SortType.SortAlphabetically)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button', 'is-success', {
            'is-light': sortGoods !== SortType.SortByLength,
          })}
          onClick={() => setSortGoods(SortType.SortByLength)}
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

        {(sortGoods !== SortType.Default || reversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortGoods(SortType.Default);
              setReversed(false);
            }}
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
