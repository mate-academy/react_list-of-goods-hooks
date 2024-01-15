// import React, { useState } from 'react';
// import 'bulma/css/bulma.css';
// import './App.scss';
// import classNames from 'classnames';

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

// interface SortBy {
//   alphabet?: boolean;
//   length?: boolean;
//   isReversed?: boolean;
// }

// function preparedGoods(
//   goods: string[],
//   { alphabet, length, isReversed }: SortBy,
// ) {
//   const getGoods = [...goods];

//   if (alphabet) {
//     getGoods.sort((good1, good2) => good1.localeCompare(good2));
//   }

//   if (length) {
//     getGoods.sort((good1, good2) => good1.length - good2.length);
//   }

//   if (isReversed) {
//     getGoods.reverse();
//   }

//   return getGoods;
// }

// export const App: React.FC = () => {
//   const [sortBy, setSortBy] = useState<SortBy>({});
//   const goods = preparedGoods(goodsFromServer, sortBy);

//   return (
//     <div className="section content">
//       <div className="buttons">
//         <button
//           type="button"
//           onClick={() => setSortBy(
//             { ...sortBy, alphabet: true, length: false },
//           )}
//           className={classNames(
//             'button',
//             'is-info',
//             {
//               'is-light': sortBy.alphabet !== true,
//             },
//           )}
//         >
//           Sort alphabetically
//         </button>

//         <button
//           type="button"
//           onClick={() => setSortBy(
//             { ...sortBy, length: true, alphabet: false },
//           )}
//           className={classNames(
//             'button',
//             'is-success',
//             {
//               'is-light': sortBy.length !== true,
//             },
//           )}
//         >
//           Sort by length
//         </button>

//         <button
//           type="button"
//           onClick={() => setSortBy(
//             { ...sortBy, isReversed: !sortBy.isReversed },
//           )}
//           className={classNames(
//             'button',
//             'is-warning',
//             {
//               'is-light': !sortBy.isReversed,
//             },
//           )}
//         >
//           Reverse
//         </button>

//         {(sortBy.alphabet || sortBy.length || sortBy.isReversed) && (
//           <button
//             type="button"
//             onClick={() => setSortBy({
//               alphabet: false,
//               length: false,
//               isReversed: false,
//             })}
//             className="button is-danger is-light"
//           >
//             Reset
//           </button>
//         )}
//       </div>

//       <ul>
//         {goods.map((good, index) => (
//           // eslint-disable-next-line react/no-array-index-key
//           <li key={index} data-cy="Good">{good}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import classNames from 'classnames';

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

export const defSorting = {
  method: '',
  isReversed: false,
};

enum Metods {
  Alphabet = 'alphabet',
  Length = 'length',
}

type SortingOptions = {
  method: string;
  isReversed: boolean;
};

function preparedGoods(
  goods: string[],
  { method, isReversed }: SortingOptions,
): string[] {
  const getGoods = [...goods];

  if (method === Metods.Alphabet) {
    getGoods.sort((good1, good2) => good1.localeCompare(good2));
  }

  if (method === Metods.Length) {
    getGoods.sort((good1, good2) => good1.length - good2.length);
  }

  if (isReversed) {
    getGoods.reverse();
  }

  return getGoods;
}

export const App = () => {
  const [sortBy, setSortBy] = useState(defSorting);
  const goods = preparedGoods(goodsFromServer, sortBy);

  const handleResetSorting = () => {
    setSortBy({
      method: '',
      isReversed: false,
    });
  };

  const handleReverse = () => {
    setSortBy(
      sortBy.isReversed
        ? { ...sortBy, isReversed: false }
        : { ...sortBy, isReversed: true },
    );
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => setSortBy({ ...sortBy, method: Metods.Alphabet })}
          className={
            classNames(
              'button',
              'is-info',
              {
                'is-light': sortBy.method !== 'alphabet',
              },
            )
          }
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={() => setSortBy({ ...sortBy, method: Metods.Length })}
          className={
            classNames(
              'button',
              'is-success',
              {
                'is-light': sortBy.method !== 'length',
              },
            )
          }
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={handleReverse}
          className={classNames(
            'button',
            'is-warning',
            {
              'is-light': !sortBy.isReversed,
            },
          )}
        >
          Reverse
        </button>

        {(sortBy.method || sortBy.isReversed) && (
          <button
            type="button"
            onClick={handleResetSorting}
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
