import { useState } from 'react';
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
  NONE = 'none',
  ALPHA = 'alpha',
  LENGTH = 'length',
}

export const App = () => {
  const [sortFields, setSorted] = useState<SortType>(SortType.NONE);
  const [reversed, setReversed] = useState<boolean>(false);

  let visibleGoods = [...goodsFromServer].sort((a, b) => {
    switch (sortFields) {
      case SortType.ALPHA:
        return a.localeCompare(b);
      case SortType.LENGTH:
        return a.length - b.length;
      default:
        return 0;
    }
  });

  if (reversed) {
    visibleGoods = visibleGoods.toReversed();
  }

  const isOriginalOrder =
    JSON.stringify(visibleGoods) === JSON.stringify(goodsFromServer);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSorted(SortType.ALPHA)}
          type="button"
          className={`button is-info ${sortFields === SortType.ALPHA ? '' : 'is-light'}`}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSorted(SortType.LENGTH)}
          type="button"
          className={`button is-success ${sortFields === SortType.LENGTH ? '' : 'is-light'}`}
        >
          Sort by length
        </button>

        <button
          onClick={() => setReversed(!reversed)}
          type="button"
          className={`button is-warning ${reversed ? '' : 'is-light'}`}
        >
          Reverse
        </button>
        {!isOriginalOrder && (
          <button
            onClick={() => {
              setSorted(SortType.NONE);
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
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
