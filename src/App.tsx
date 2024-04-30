import React from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import cn from 'classnames';

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
  alphabet = 'abc',
  length = 'length',
}

function getVisibleGoods(
  goods: string[],
  sortField: string,
  isReversed: boolean,
) {
  let ret = [...goods];

  if (sortField === SortType.alphabet) {
    ret = ret.sort((good1, good2) => good1.localeCompare(good2));
  } else if (sortField === SortType.length) {
    ret = ret.sort((good1, good2) => good1.length - good2.length);
  }

  if (isReversed) {
    ret.reverse();
  }

  return ret;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState('');
  const [isReversed, setIsReversed] = useState(false);
  const handleSort = (sort: string) => setSortField(sort);
  const handleReverse = () => setIsReversed(pr => !pr);
  const handleReset = () => {
    setSortField('');
    setIsReversed(false);
  };

  const visibleGoods = getVisibleGoods(goodsFromServer, sortField, isReversed);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={
            sortField === SortType.alphabet
              ? cn('button is-info')
              : cn('button is-info is-light')
          }
          onClick={() => handleSort(SortType.alphabet)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={
            sortField === SortType.length
              ? cn('button is-success')
              : cn('button is-success is-light')
          }
          onClick={() => handleSort(SortType.length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn(`button is-warning ${isReversed ? '' : 'is-light'}`)}
          onClick={handleReverse}
        >
          Reverse
        </button>

        {sortField === '' && !isReversed ? (
          ''
        ) : (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleReset}
          >
            Reset
          </button>
        )}
      </div>
      <ul>
        {visibleGoods.map(good => (
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
