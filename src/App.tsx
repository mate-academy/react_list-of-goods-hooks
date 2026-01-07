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

enum SortType {
  SortAlpha = 'abc',
  SortLength = 'length',
  Default = '',
}

function getSortedGoods(
  goods: string[],
  sortType: SortType | string,
  isReverse: boolean,
): string[] {
  const visibleGoods = [...goods];

  if (sortType !== '') {
    visibleGoods.sort((good1, good2) => {
      switch (sortType) {
        case SortType.SortAlpha:
          return good1.localeCompare(good2);
        case SortType.SortLength:
          return good1.length - good2.length;
        default:
          return 0;
      }
    });

    if (isReverse) {
      return visibleGoods.reverse();
    }
  } else if (isReverse) {
    return visibleGoods.reverse();
  }

  return visibleGoods;
}

export const App: React.FC = () => {
  const [sortType, setSortType] = useState<SortType | string>('');
  const [reverseField, setReverseField] = useState(false);
  const visibleGoods = getSortedGoods(goodsFromServer, sortType, reverseField);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortType !== SortType.SortAlpha ? 'is-light' : ''}`}
          onClick={() => {
            setSortType(SortType.SortAlpha);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortType !== SortType.SortLength ? 'is-light' : ''}`}
          onClick={() => {
            setSortType(SortType.SortLength);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${reverseField !== true ? 'is-light' : ''}`}
          onClick={() => {
            setReverseField(prev => !prev);
          }}
        >
          Reverse
        </button>

        {(sortType !== SortType.Default || reverseField) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortType(SortType.Default);
              setReverseField(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(item => (
          <li data-cy="Good" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
