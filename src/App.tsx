import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import cn from 'classnames';
import './App.scss';

type Goods = string[];
enum SortType {
  alphabet = 'alphabetically',
  length = 'length',
  none = '',
}
type Sort = {
  valueSort: SortType;
  valueReverse: boolean;
};

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

function sortGoods(goods: Goods, { valueSort, valueReverse }: Sort) {
  if (valueSort === SortType.alphabet) {
    goods.sort((good1, good2) => good1.localeCompare(good2));
  } else if (valueSort === SortType.length) {
    goods.sort((good1, good2) => good1.length - good2.length);
  }

  if (valueReverse) {
    goods.reverse();
  }

  return goods;
}

export const App: React.FC = () => {
  const [valueSort, setValueSort] = useState(SortType.none);
  const [valueReverse, setValueReverse] = useState(false);
  const clickReset = () => {
    setValueSort(SortType.none);
    setValueReverse(false);
  };

  const sortList = sortGoods([...goodsFromServer], { valueSort, valueReverse });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': valueSort !== SortType.alphabet,
          })}
          onClick={() => setValueSort(SortType.alphabet)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': valueSort !== SortType.length,
          })}
          onClick={() => setValueSort(SortType.length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !valueReverse,
          })}
          onClick={() => setValueReverse(!valueReverse)}
        >
          Reverse
        </button>

        {valueSort !== '' || valueReverse ? (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => clickReset()}
          >
            Reset
          </button>
        ) : (
          ''
        )}
      </div>

      <ul>
        {sortList.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};

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
