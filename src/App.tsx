import React, { useEffect, useState } from 'react';
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

export enum SortType {
  Default,
  Alphabetically,
  ByLength,
  Reverse,
}

export const App: React.FC = () => {
  const [goods, setGoods] = useState<string[]>([]);
  const [sortType, setSortType] = useState<SortType>(SortType.Default);

  useEffect(() => {
    switch (sortType) {
      case SortType.Alphabetically:
        setGoods([...goodsFromServer].sort((a, b) => a.localeCompare(b)));
        break;
      case SortType.ByLength:
        setGoods([...goodsFromServer].sort((a, b) => a.length - b.length));
        break;
      case SortType.Reverse:
        setGoods([...goodsFromServer].slice().reverse());
        break;
      default:
        setGoods([...goodsFromServer]);
    }
  }, [sortType]);

  const getButtonClass = (type: SortType) => {
    if (sortType === type) {
      return 'is-primary';
    }

    return 'is-light';
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${getButtonClass(SortType.Alphabetically)}`}
          onClick={() => setSortType(SortType.Alphabetically)}
        >
          Сортувати за алфавітом
        </button>

        <button
          type="button"
          className={`button is-success ${getButtonClass(SortType.ByLength)}`}
          onClick={() => setSortType(SortType.ByLength)}
        >
          Сортувати за довжиною
        </button>

        <button
          type="button"
          className={`button is-warning ${getButtonClass(SortType.Reverse)}`}
          onClick={() => setSortType(SortType.Reverse)}
        >
          Реверс
        </button>

        <button
          type="button"
          className={`button is-danger ${getButtonClass(SortType.Default)}`}
          onClick={() => setSortType(SortType.Default)}
        >
          Скинути
        </button>
      </div>

      <ul>
        {goods.map(item => (
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
