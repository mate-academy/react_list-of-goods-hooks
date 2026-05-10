import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import clsx from 'clsx';

type Goods = string[];
enum SortType {
  Alph = 'alph',
  Length = 'length',
  None = 'none',
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

function getSortField(goods: Goods, kindSort: SortType) {
  const copyGoods = [...goods];

  if (kindSort) {
    copyGoods.sort((good1, good2) => {
      switch (kindSort) {
        case SortType.Alph:
          return good1.localeCompare(good2);
        case SortType.Length:
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  }

  return copyGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState<SortType>(SortType.None);
  const [reversed, setReversed] = useState(false);
  let visibleField = getSortField(goodsFromServer, sortField);

  if (reversed) {
    visibleField = visibleField.toReversed();
  }

  const isUnsorted = () => {
    return visibleField.every((item, i) => item === goodsFromServer[i]);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={clsx('button', 'is-info', {
            'is-light': sortField !== SortType.Alph,
          })}
          onClick={() => setSortField(SortType.Alph)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={clsx('button', 'is-success', {
            'is-light': sortField !== SortType.Length,
          })}
          onClick={() => setSortField(SortType.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={clsx('button', 'is-warning', { 'is-light': !reversed })}
          onClick={() => setReversed(!reversed)}
        >
          Reverse
        </button>
        {!isUnsorted() && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortField(SortType.None);
              setReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleField.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
