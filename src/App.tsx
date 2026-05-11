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
  NONE = 'none',
  ALPHA = 'alpha',
  LENGTH = 'length',
}

function getSortedGoods(
  good: string[],
  goodStyle: SortType,
  isRevers: boolean,
) {
  const items = [...good];

  if (goodStyle === SortType.ALPHA) {
    items.sort((a, b) => a.localeCompare(b));
  }

  if (goodStyle === SortType.LENGTH) {
    items.sort((a, b) => a.length - b.length);
  }

  if (isRevers) {
    items.reverse();
  }

  return items;
}

export const App = () => {
  const [goodStyle, setGoodStyle] = useState(SortType.NONE);
  const [isRevers, setIsReverse] = useState(false);
  const items = getSortedGoods(goodsFromServer, goodStyle, isRevers);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${goodStyle !== SortType.ALPHA ? 'is-light' : ''}`}
          onClick={() => {
            setGoodStyle(SortType.ALPHA);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${goodStyle !== SortType.LENGTH ? 'is-light' : ''}`}
          onClick={() => {
            setGoodStyle(SortType.LENGTH);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${!isRevers ? 'is-light' : ''}`}
          onClick={() => {
            setIsReverse(!isRevers);
          }}
        >
          Reverse
        </button>

        {(goodStyle !== SortType.NONE || isRevers) && (
          <button
            type="button"
            className="button is-danger"
            onClick={() => {
              setGoodStyle(SortType.NONE);
              setIsReverse(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {items.map(item => (
          <li key={item} data-cy="Good">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
