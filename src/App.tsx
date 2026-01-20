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

enum SortType {
  alphabet,
  length,
  default,
}

export const App: React.FC = () => {
  const [preparedGoods, setPreparedGoods] = useState<string[]>(goodsFromServer);
  const [reverse, setReverse] = useState<boolean>(false);
  const [state, setState] = useState<SortType>(SortType.default);

  function sortGoods(query: SortType): void {
    const newGoods = [...goodsFromServer].sort((good1, good2) => {
      switch (query) {
        case SortType.length:
          return good1.length - good2.length;

        case SortType.alphabet:
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
            state === SortType.alphabet
              ? 'button is-info'
              : 'button is-info is-light'
          }
          onClick={() => {
            if (state !== SortType.alphabet) {
              sortGoods(SortType.alphabet);
              setState(SortType.alphabet);
            } else {
              setPreparedGoods(goodsFromServer);
              setState(SortType.default);
              setReverse(false);
            }
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={
            state === SortType.length
              ? 'button is-success'
              : 'button is-success is-light'
          }
          onClick={() => {
            if (state !== SortType.length) {
              sortGoods(SortType.length);
              setState(SortType.length);
            } else {
              setPreparedGoods(goodsFromServer);
              setState(SortType.default);
              setReverse(false);
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
              setState(SortType.default);
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
