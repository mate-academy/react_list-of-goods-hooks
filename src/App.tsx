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

export function GetReorderedGoods(
  goods: string[],
  sortType: SortType,
  isReversed: boolean,
) {
  const visibleGoods = [...goods];

  function renderGoods(goodsList: string[]) {
    const goodsItem = goodsList.map((product: string) => (
      <li data-cy="Good" key={product}>{product}</li>
    ));

    if (isReversed === false) {
      return goodsItem;
    }

    return goodsItem.reverse();
  }

  switch (sortType) {
    case 'ALPABET':
      return renderGoods(visibleGoods.sort((a, b) => a.localeCompare(b)));

    case 'LENGTH':
      return renderGoods(visibleGoods.sort((a, b) => a.length - b.length));

    default:
      return renderGoods(visibleGoods);
  }
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
        {GetReorderedGoods(goodsFromServer, sortType, isReversed)}
      </ul>
    </div>
  );
};
