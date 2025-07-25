import React, {useState} from 'react';
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
  SORT_ALPHABETICALLY = 'alphabetically',
  SORT_BY_LENGTH = 'length',
}

interface Sort {
  sortQuery: string;
  reversed: boolean;
}

function getSortedGoods(goods: string[], { sortQuery, reversed }: Sort) {
  const sortedGoods = [...goods];

  if (sortQuery) {
    sortedGoods.sort((goods1, goods2) => {
      switch (sortQuery) {
        case SortType.SORT_ALPHABETICALLY:
          return goods1.localeCompare(goods2);
        case SortType.SORT_BY_LENGTH:
          return goods1.length - goods2.length;
        default:
          return 0;
      }
    });
  }

  if (reversed) {
    sortedGoods.reverse();
  }

  return sortedGoods;
}

export const App: React.FC = () => {
  const [sortQuery, setQuery] = useState<SortType | ''>('');
  const [reversed, setReversed] = useState(false);
  const goodsCopy = getSortedGoods(goodsFromServer, { sortQuery, reversed });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortQuery === SortType.SORT_ALPHABETICALLY ? '' : 'is-light'}`}
          onClick={() => {
            setQuery(SortType.SORT_ALPHABETICALLY);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortQuery === SortType.SORT_BY_LENGTH ? '' : 'is-light'}`}
          onClick={() => {
            setQuery(SortType.SORT_BY_LENGTH);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${reversed === true ? '' : 'is-light'}`}
          onClick={() => {
            if (reversed) {
              setReversed(false);
            } else {
              setReversed(true);
            }
          }}
        >
          Reverse
        </button>

        {(reversed || sortQuery) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setQuery('');
              setReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goodsCopy.map(goods => (
          <li data-cy="Good" key={goods}>
            {goods}
          </li>
        ))}
      </ul>
    </div>
  );
};
