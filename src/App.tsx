import React, { useState } from 'react';
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

// Тип перерахування для типів сортування (не використовується, але можеш зберегти для майбутнього)
export enum SortType {
  Default,
  Alphabetically,
  ByLength,
  Reverse,
}

export const App: React.FC = () => {
  const [goods, setGoods] = useState<string[]>([...goodsFromServer]);

  const handleSortAlphabetically = () => {
    setGoods([...goods].sort((a, b) => a.localeCompare(b)));
  };

  const handleSortByLength = () => {
    setGoods([...goods].sort((a, b) => a.length - b.length));
  };

  const handleReverse = () => {
    setGoods([...goods].slice().reverse());
  };

  const handleReset = () => {
    setGoods([...goodsFromServer]);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className="button is-info is-light"
          onClick={handleSortAlphabetically}
        >
          Сортувати за алфавітом
        </button>

        <button
          type="button"
          className="button is-success is-light"
          onClick={handleSortByLength}
        >
          Сортувати за довжиною
        </button>

        <button
          type="button"
          className="button is-warning is-light"
          onClick={handleReverse}
        >
          Реверс
        </button>

        <button
          type="button"
          className="button is-danger is-light"
          onClick={handleReset}
        >
          Скинути
        </button>
      </div>

      <ul>
        {goods.map((item) => (
          <li key={item} data-cy="Good">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

// import React, { useState } from 'react';
// import 'bulma/css/bulma.css';
// import './App.scss';

// export const goodsFromServer = [
//   'Dumplings',
//   'Carrot',
//   'Eggs',
//   'Ice cream',
//   'Apple',
//   'Bread',
//   'Fish',
//   'Honey',
//   'Jam',
//   'Garlic',
// ];

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
