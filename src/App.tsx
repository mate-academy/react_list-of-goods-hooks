import React, { useReducer, useState } from 'react';
import './App.css';

const goodsFromServer: string[] = [
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

type Action = { type: string };

type State = {
  data: string[];
  error?: Error,
};

function reducer(state: State, action: Action): State {
  const copy = [...state.data];

  switch (action.type) {
    case 'byLength':
      return { data: copy.sort((a, b) => a.length - b.length) };
    case 'byAlphabet':
      return { data: copy.sort((a, b) => a.localeCompare(b)) };
    case 'reset':
      return { data: goodsFromServer };
    case 'reverse':
      return { data: copy.reverse() };
    default:
      return { error: new Error('something go wrong'), data: copy };
  }
}

export const App: React.FC = () => {
  const [permission, setPermission] = useState(false);

  const [{ data }, dispatch] = useReducer(reducer, { data: goodsFromServer });

  const permissionHandler = () => {
    setPermission(true);
  };

  return (
    <div className="App">
      {!permission
        ? (
          <button type="button" onClick={permissionHandler}>
            Start
          </button>
        )
        : (
          <>
            <button
              type="button"
              onClick={() => dispatch({ type: 'byAlphabet' })}
            >
              Sort alphabetically
            </button>

            <button
              type="button"
              onClick={() => dispatch({ type: 'byLength' })}
            >
              Sort by length
            </button>

            <button
              type="button"
              onClick={() => dispatch({ type: 'reverse' })}
            >
              Reverse
            </button>

            <button
              type="button"
              onClick={() => dispatch({ type: 'reset' })}
            >
              Reset
            </button>

            <ul className="Goods">
              {data.map(good => {
                return (
                  <li
                    className="Goods__item"
                    key={good + Math.random()}
                  >
                    {good}
                  </li>
                );
              })}
            </ul>
          </>
        )}

    </div>
  );
};
