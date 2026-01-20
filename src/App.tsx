import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import { GoodList } from './Components/GoodList';

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

enum State {
  alphabet,
  length,
  default,
}

export const App: React.FC = () => {
  const [preparedGoods, setPreparedGoods] = useState<string[]>(goodsFromServer);
  const [reverse, setReverse] = useState<boolean>(false);
  const [state, setState] = useState<State>(State.default);

  function sortGoods(query: State): void {
    const newGoods = [...goodsFromServer].sort((good1, good2) => {
      switch (query) {
        case State.length:
          return good1.length - good2.length;

        case State.alphabet:
          return good1.localeCompare(good2);

        default:
          return 0;
      }
    });

    if (reverse) {
      newGoods.reverse();
    }

    setPreparedGoods(newGoods);
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={
            state === State.alphabet
              ? 'button is-info'
              : 'button is-info is-light'
          }
          onClick={() => {
            if (state !== State.alphabet) {
              sortGoods(State.alphabet);
              setState(State.alphabet);
            } else {
              setPreparedGoods(goodsFromServer);
              setState(State.default);
            }
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={
            state === State.length
              ? 'button is-success'
              : 'button is-success is-light'
          }
          onClick={() => {
            if (state !== State.length) {
              sortGoods(State.length);
              setState(State.length);
            } else {
              setPreparedGoods(goodsFromServer);
              setState(State.default);
            }
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
            setPreparedGoods(list => [...list].reverse());
            setReverse(prev => !prev);
          }}
        >
          Reverse
        </button>

        {JSON.stringify(goodsFromServer) !== JSON.stringify(preparedGoods) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setReverse(false);
              setPreparedGoods([...goodsFromServer]);

              setState(State.default);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <GoodList goods={preparedGoods} />
    </div>
  );
};
