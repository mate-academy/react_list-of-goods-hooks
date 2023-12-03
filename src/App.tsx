import 'bulma/css/bulma.css';
import './App.scss';

import React, { useState } from 'react';

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

type Props = {
  good: string,
};

export const Good: React.FC<Props> = ({ good }) => (
  <li data-cy="Good">{good}</li>
);

enum Queries {
  alphabetically = 'abc...',
  length = 'length',
}

export const App: React.FC = () => {
  const [query, setQuery] = useState<Queries | ''>('');
  const [reverse, setReverse] = useState(false);

  let copyGoods: string[] = [...goodsFromServer];

  if (query === Queries.alphabetically) {
    copyGoods = copyGoods.sort((good1, good2) => {
      return good1.localeCompare(good2);
    });
  }

  if (query === Queries.length) {
    copyGoods = copyGoods.sort((good1, good2) => {
      return good1.length - good2.length;
    });
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setQuery(Queries.alphabetically)}
          type="button"
          className={query === Queries.alphabetically ? (
            'button is-info'
          ) : (
            'button is-info is-light'
          )}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setQuery(Queries.length)}
          type="button"
          className={query === Queries.length ? (
            'button is-success'
          ) : (
            'button is-success is-light'
          )}
        >
          Sort by length
        </button>

        <button
          onClick={() => {
            return reverse ? setReverse(false) : setReverse(true);
          }}
          type="button"
          className={reverse === true ? (
            'button is-warning'
          ) : (
            'button is-warning is-light'
          )}
        >
          Reverse
        </button>

        {(query !== '' || reverse) && (
          <button
            onClick={() => {
              setQuery('');
              setReverse(false);
            }}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        <ul>
          {reverse === true ? (
            copyGoods.reverse().map(good => (
              <Good good={good} key={good} />
            ))) : (
            copyGoods.map(good => (
              <Good good={good} key={good} />
            )))}
        </ul>
      </ul>
    </div>
  );
};
