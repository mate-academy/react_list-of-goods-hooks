import React, { useState } from 'react';
import cn from 'classnames';
import 'bulma/css/bulma.css';
import './App.scss';

type SortParams = {
  property: string,
  reverse: boolean,
};

function getGoods(goods: string[], sortParams: SortParams) {
  const goodsCopy = [...goods];

  if (sortParams.property) {
    goodsCopy.sort((good1, good2) => {
      switch (sortParams.property) {
        case 'name':
          return good1.localeCompare(good2);
        case 'length':
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  }

  if (sortParams.reverse) {
    goodsCopy.reverse();
  }

  return goodsCopy;
}

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

export const App: React.FC = () => {
  const [sortParams, setSortParams] = useState({
    property: '',
    reverse: false,
  });
  const preparedGoods = getGoods(goodsFromServer, sortParams);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn(
            'button is-info',
            { 'is-light': sortParams.property !== 'name' },
          )}
          onClick={() => setSortParams({
            ...sortParams,
            property: 'name',
          })}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn(
            'button is-success',
            { 'is-light': sortParams.property !== 'length' },
          )}
          onClick={() => setSortParams({
            ...sortParams,
            property: 'length',
          })}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn(
            'button is-warning',
            { 'is-light': !sortParams.reverse },
          )}
          onClick={() => setSortParams({
            ...sortParams,
            reverse: !sortParams.reverse,
          })}
        >
          Reverse
        </button>

        {(sortParams.property || sortParams.reverse) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => setSortParams({
              property: '',
              reverse: false,
            })}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        <ul>
          {preparedGoods.map((good: string) => (
            <li data-cy="Good" key={good}>{good}</li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
