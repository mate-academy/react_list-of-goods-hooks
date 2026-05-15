import 'bulma/css/bulma.css';
import './App.scss';
import React, { useState } from 'react';


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
  name = 'name',
  length = 'length',
  none = ''
}

enum Directon {
  up = 'up',
  down = 'down',
}


function getPrepareGoods(goods:string[], sortName:SortType, direction:Directon) {
  const prepareGods = [...goods];

  if (sortName) {
    prepareGods.sort((good1, good2) => {
      switch (sortName) {
        case SortType.name:
          return good1.localeCompare(good2);
        case SortType.length:
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  }

  if (direction === Directon.up) {
    prepareGods.reverse();
  }

  return prepareGods;
}

export const App: React.FC  = () => {
  const [sortField, setSortField] = useState<SortType>(SortType.none);
  const [direction, setDirection] = useState(Directon.down);
  const visibleGoods = getPrepareGoods(goodsFromServer, sortField, direction);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={
            sortField === SortType.name
              ? 'button is-success'
              : 'button is-success is-light'
          }
          onClick={() => setSortField(SortType.name)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={
            sortField === SortType.length
              ? 'button is-success'
              : 'button is-success is-light'
          }
          onClick={() => setSortField(SortType.length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={
            direction === Directon.up
              ? 'button is-success'
              : 'button is-success is-light'
          }
          onClick={() => {
            if (direction === Directon.down) {
              setDirection(Directon.up);
            } else {
              setDirection(Directon.down);
            }
          }}
        >
          Reverse
        </button>
        {(sortField || direction !== Directon.down) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortField(SortType.none);
              setDirection(Directon.down);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => {
          return (
            <li data-cy="Good" key={good}>
              {good}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
