import React, { useReducer } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

enum SortType {
  Alphabetical = 'ALPHA',
  Length = 'LENGTH',
  Reverse = 'REVERSE',
  Clear = 'CLEAR',
}

type ProductWithKey = {
  id: number;
  product: string;
};

export const goodsFromServer: string[] = [
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

const goodsWithKeys = goodsFromServer.map((good, i) => {
  return { id: i + 1, product: good };
});

type Action =
  | { type: SortType.Alphabetical }
  | { type: SortType.Length }
  | { type: SortType.Reverse }
  | { type: SortType.Clear };

type State = {
  sortedList: ProductWithKey[];
  sortedBy: string;
  isReversed: boolean;
};

export const App: React.FC = () => {
  const initialState = {
    sortedList: [...goodsWithKeys],
    sortedBy: '',
    isReversed: false,
    isChanged: false,
  };

  function reducer(state: State, action: Action): State {
    let { sortedList, sortedBy, isReversed } = state;

    switch (action.type) {
      case SortType.Alphabetical:
        sortedBy = SortType.Alphabetical;
        sortedList = !isReversed
          ? [...sortedList].sort((a, b) => a.product.localeCompare(b.product))
          : [...sortedList].sort((a, b) => b.product.localeCompare(a.product));
        break;
      case SortType.Length:
        sortedBy = SortType.Length;
        sortedList = !isReversed
          ? [...sortedList].sort((a, b) => a.product.length - b.product.length)
          : [...sortedList].sort((a, b) => b.product.length - a.product.length);
        break;
      case SortType.Reverse:
        isReversed = !isReversed;
        sortedList = sortedList.reverse();
        break;
      case SortType.Clear:
        sortedBy = '';
        isReversed = false;
        sortedList = [...goodsWithKeys];
        break;
      default:
        break;
    }

    return { sortedList, sortedBy, isReversed };
  }

  const [{ sortedList, sortedBy, isReversed }, dispatch] = useReducer(
    reducer,
    initialState,
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => dispatch({ type: SortType.Alphabetical })}
          type="button"
          className={
            sortedBy !== SortType.Alphabetical
              ? 'button is-info is-light'
              : 'button is-info'
          }
        >
          Sort alphabetically
        </button>
        <button
          onClick={() => dispatch({ type: SortType.Length })}
          type="button"
          className={
            sortedBy !== SortType.Length
              ? 'button is-success is-light'
              : 'button is-info'
          }
        >
          Sort by length
        </button>
        <button
          onClick={() => dispatch({ type: SortType.Reverse })}
          type="button"
          className={
            !isReversed ? 'button is-warning is-light' : 'button is-warning'
          }
        >
          Reverse
        </button>
        {isReversed || sortedBy !== '' ? (
          <button
            onClick={() => dispatch({ type: SortType.Clear })}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        ) : null}
      </div>

      <ul>
        {sortedList.map(({ id, product }) => (
          <li key={id} data-cy="Good">
            {product}
          </li>
        ))}
      </ul>
    </div>
  );
};
