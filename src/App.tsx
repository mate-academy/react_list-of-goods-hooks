import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import './types/SortType';
import { SortType } from './types/SortType';

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

// export const App: React.FC = () => {
//   return (
//     <div className="section content">
//       <div className="buttons">
//         <button type="button" className="button is-info is-light">
//           Sort alphabetically
//         </button>

//         <button type="button" className="button is-success is-light">
//           Sort by length
//         </button>

//         <button type="button" className="button is-warning is-light">
//           Reverse
//         </button>

//         <button type="button" className="button is-danger is-light">
//           Reset
//         </button>
//       </div>

//       <ul>
//         <ul>
//           <li data-cy="Good">Dumplings</li>
//           <li data-cy="Good">Carrot</li>
//           <li data-cy="Good">Eggs</li>
//           <li data-cy="Good">Ice cream</li>
//           <li data-cy="Good">Apple</li>
//           <li data-cy="Good">...</li>
//         </ul>
//       </ul>
//     </div>
//   );
// };

function areArraysEqual(arr1: string[], arr2: string[]) {
  if (arr1.length !== arr2.length) {
    return false;
  }

  return arr1.every((el, i) => el === arr2[i]);
}

export const App = () => {
  const [goods, setGoods] = useState([...goodsFromServer]);
  const [reverse, setReverse] = useState(false);
  const [sortMode, setSortMode] = useState('none');

  const reverseGoods = () => {
    setGoods([...goods].reverse());
    setReverse(!reverse);
  };

  const resetGoods = () => {
    setGoods([...goodsFromServer]);
    setSortMode('');
    setReverse(false);
  };

  const alphabetGoods = [...goodsFromServer].sort((a, b) => a.localeCompare(b));

  const sortGoods = (mode: SortType) => {
    setSortMode(mode);
    if (mode === 'alphabet') {
      const alphabetGoodsNew = alphabetGoods;

      if (reverse === true) {
        setGoods([...alphabetGoodsNew].reverse());
      } else {
        setGoods(alphabetGoodsNew);
      }
    }

    if (mode === 'length') {
      const lengthGoods = [...goodsFromServer].sort(
        (a, b) => a.length - b.length,
      );

      if (reverse === true) {
        setGoods([...lengthGoods].reverse());
      } else {
        setGoods(lengthGoods);
      }
    }
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortMode === 'alphabet' ? '' : 'is-light'}`}
          onClick={() => {
            sortGoods(SortType.Alphabet);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortMode === 'length' ? '' : 'is-light'}`}
          onClick={() => {
            sortGoods(SortType.Length);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${!reverse ? 'is-light' : ''}`}
          onClick={reverseGoods}
        >
          Reverse
        </button>

        {!areArraysEqual(goods, goodsFromServer) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={resetGoods}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {[...goods].map(good => {
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
