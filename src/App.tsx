import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';

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
// const ALPHABET = 'alphabet';
// const LENGTH = 'length';

enum Method {
 alphabet = 'alphabet',
  length = 'length',
}

type Params = {
  sortField: Method | '',
  reverse: boolean,
}

const sort = (list: string[], { sortField, reverse }: Params) => {
  const preparedList = [...list].sort((good1, good2) => {
    switch (sortField) {
      case Method.alphabet:
        return good1.localeCompare(good2);

      case Method.length:
        return good1.length - good2.length;

      default:
        return 0;
    }
  });

  if (reverse) {
    return preparedList.reverse();
  }

  return preparedList;
};

export const App = () => {
  const [sortField, setSortField] = useState<Method | ''>('');
  const [reverse, setReverse] = useState(false);

  const preparedList = sort(goodsFromServer, { sortField, reverse });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={
            sortField === Method.alphabet
              ? 'button is-info'
              : 'button is-success is-light'
          }
          onClick={() => {
            setSortField(Method.alphabet);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={
            sortField === Method.length
              ? 'button is-success'
              : 'button is-success is-light'  
          }
          onClick={() => {
            setSortField(Method.length);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={
            reverse === true
              ? 'button is-warning'
              : 'button is-warning is-light'
          }
          onClick={() => {
            setReverse(!reverse);
          }}
        >
          Reverse
        </button>

        {preparedList.some((good, i) => good !== goodsFromServer[i]) && (
          <button
            type="button"
            className="button is-danger"
            onClick={() => {
              setSortField('');
              setReverse(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {preparedList.map(good => {
          return (
            <li data-cy="Good" key={good}>
              {good}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
