import React from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';

enum SortType {
  NONE = '',
  LENGTH = 'length',
  ALPHABET = 'alphabet',
}

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

const getVisibleGoods = (
  goods: string[],
  sortType: SortType,
  isReverse: boolean,
): string[] => {
  const result = [...goods];

  switch (sortType) {
    case SortType.LENGTH:
      result.sort((a, b) => a.length - b.length);
      break;

    case SortType.ALPHABET:
      result.sort((a, b) => a.localeCompare(b));
      break;

    default:
      break;
  }

  if (isReverse) {
    result.reverse();
  }

  return result;
};

export const App: React.FC = () => {
  const [sortType, setSortType] = useState<SortType>(SortType.NONE);
  const [isReverse, setIsReverse] = useState<boolean>(false);

  const visibleGoods = getVisibleGoods(goodsFromServer, sortType, isReverse);

  const reset = (): void => {
    setSortType(SortType.NONE);
    setIsReverse(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${
            sortType === SortType.ALPHABET ? '' : 'is-light'
          }`}
          onClick={() => setSortType(SortType.ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-info ${
            sortType === SortType.LENGTH ? '' : 'is-light'
          }`}
          onClick={() => setSortType(SortType.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReverse ? '' : 'is-light'}`}
          onClick={() => setIsReverse(prev => !prev)}
        >
          Reverse
        </button>

        {(sortType !== SortType.NONE || isReverse) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={reset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};

//     result.sort((a, b) => a.length - b.length);
//   }

//   if (sortField === SORT_BY_ALPHABETICALLY) {
//     result.sort((a, b) => a.localeCompare(b));
//   }

//   if (isReverse) {
//     result.reverse();
//   }

//   return result;
// }

// export const App = () => {
//   const [sortField, setSortField] = useState('');
//   const [isReverse, setIsReverse] = useState(false);
//   const visibleGoods = getVisibleGoods(goodsFromServer, sortField, isReverse);
//   const reset = () => {
//     setSortField('');
//     setIsReverse(false);
//   };

//   return (
//     <div className="section content">
//       <div className="buttons">
//         <button
//           type="button"
//           className={`button is-info ${
//             sortField === SORT_BY_ALPHABETICALLY ? '' : 'is-light'
//           }`}
//           onClick={() => setSortField(SORT_BY_ALPHABETICALLY)}
//         >
//           Sort alphabetically
//         </button>

//         <button
//           type="button"
//           className={`button is-info ${
//             sortField === SORT_BY_LENGTH ? '' : 'is-light'
//           }`}
//           onClick={() => setSortField(SORT_BY_LENGTH)}
//         >
//           Sort by length
//         </button>

//         <button
//           type="button"
//           className={`button is-warning ${isReverse === true ? '' : 'is-light'}`}
//           onClick={() => setIsReverse(prev => !prev)}
//         >
//           Reverse
//         </button>

//         {(sortField || isReverse) && (
//           <button
//             type="button"
//             className="button is-danger is-light"
//             onClick={reset}
//           >
//             Reset
//           </button>
//         )}
//       </div>

//       <ul>
//         {visibleGoods.map(good => (
//           <li data-cy="Good" key={good}>
//             {good}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };
