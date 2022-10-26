import React, { useState } from 'react';
import className from 'classnames';
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

type SortType = 'NONE' | 'ALPABET' | 'LENGTH';

function GetReorderedGoods(
  goods: string[],
  sortType: SortType,
  isReversed: boolean,
) {
  const visibleGoodsSort = [...goods];

  switch (sortType) {
    case 'ALPABET':
      visibleGoodsSort.sort((a, b) => a.localeCompare(b));
      break;

    case 'LENGTH':
      visibleGoodsSort.sort((a, b) => a.length - b.length);
      break;

    default:
      break;
  }

  if (isReversed === false) {
    return visibleGoodsSort;
  }

  return visibleGoodsSort.reverse();
}

export const App: React.FC = () => {
  const [sortType, setSort] = useState<SortType>('NONE');
  const [isReversed, setIsReverse] = useState(false);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={className(
            'button',
            'is-info',
            { 'is-light': sortType !== 'ALPABET' },
          )}
          onClick={() => {
            setSort('ALPABET');
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={className(
            'button',
            'is-success',
            { 'is-light': sortType !== 'LENGTH' },
          )}
          onClick={() => {
            setSort('LENGTH');
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={className(
            'button',
            'is-warning',
            { 'is-light': !isReversed },
          )}
          onClick={() => {
            setIsReverse(!isReversed);
          }}
        >
          Reverse
        </button>

        <button
          type="button"
          className={className(
            'button',
            'is-danger',
            'is-light',
            { 'is-hidden': sortType === 'NONE' && !isReversed },
          )}
          onClick={() => {
            setSort('NONE');
            setIsReverse(false);
          }}
        >
          Reset
        </button>
      </div>

      <ul>
        {GetReorderedGoods(goodsFromServer, sortType, isReversed)
          .map((product: string) => (
            <li data-cy="Good" key={product}>{product}</li>
          ))}
      </ul>
    </div>
  );
};
