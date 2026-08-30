import React from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';

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
  NONE = '',
  ALPHABET = 'alphabet',
  LENGTH = 'length',
}

interface FilterParams {
  sortField: SortType;
  reversed: boolean;
}

function getPrepearedGoods(
  goods: string[],
  { sortField, reversed }: FilterParams,
) {
  let prepearedGoods = [...goods];

  if (sortField) {
    prepearedGoods.sort((good1, good2) => {
      switch (sortField) {
        case 'alphabet':
          return good1.localeCompare(good2);
        case 'length':
          return good1.length - good2.length;
        default:
          return 0;
      }
      // const value1 = good1[sortField];
      // const value2 = good2[sortField];

      // if (typeof value1 === 'number' && typeof value2 === 'number') {
      //   return value1 - value2;
      // }

      // if (typeof value1 === 'string' && typeof value2 === 'string') {
      //   return value1.localeCompare(value2);
      // }

      // return 0;
    });
  }

  if (reversed) {
    prepearedGoods = prepearedGoods.toReversed();
  }

  return prepearedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortType>('');
  const [reversed, setReversed] = useState(false);
  const visibleGoods = getPrepearedGoods(goodsFromServer, {
    sortField,
    reversed,
  });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortField === SortType.ALPHABET ? 'is-active' : 'is-light'}`}
          onClick={() => setSortField(SortType.ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortField === SortType.LENGTH ? 'is-active' : 'is-light'}`}
          onClick={() => setSortField(SortType.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${reversed ? 'is-active' : 'is-light'}`}
          onClick={() => setReversed(!reversed)}
        >
          Reverse
        </button>

        {(sortField !== SortType.NONE || reversed) && (
          <button
            type="button"
            className={`button is-danger ${sortField !== SortType.NONE || reversed === true ? 'is-active' : 'is-light'}`}
            onClick={() => {
              setSortField(SortType.NONE);
              setReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(goods => (
          <li data-cy="Good" key={goods}>
            {goods}
          </li>
        ))}
      </ul>
    </div>
  );
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
};
