import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import { GoodsList } from './components/GoodsList';
import { Good } from './types/Good';
import classNames from 'classnames';

export const goodsFromServer: Good[] = [
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

enum SortMethod {
  Alphabetically,
  ByLength,
}

type Direction = 'straight' | 'reverse';

function sortList(
  list: Good[],
  sortMethod: SortMethod | undefined,
  direction: Direction,
): Good[] {
  let sortedList: Good[];

  switch (sortMethod) {
    case SortMethod.Alphabetically:
      sortedList = [...list].sort((a: Good, b: Good) => a.localeCompare(b));
      break;
    case SortMethod.ByLength:
      sortedList = [...list].sort((a: Good, b: Good) => a.length - b.length);
      break;
    default:
      sortedList = [...list];
  }

  return direction === 'reverse' ? sortedList.reverse() : sortedList;
}

export const App: React.FC = () => {
  const [sortMethod, setSortMethod] = useState<SortMethod | undefined>(
    undefined,
  );

  const [direction, setDirection] = useState<Direction>('straight');

  function resetSort() {
    setSortMethod(undefined);
    setDirection('straight');
  }

  const sortedGoods: Good[] = sortList(goodsFromServer, sortMethod, direction);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button is-info', {
            'is-light': sortMethod !== SortMethod.Alphabetically,
          })}
          onClick={() => setSortMethod(SortMethod.Alphabetically)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button is-success', {
            'is-light': sortMethod !== SortMethod.ByLength,
          })}
          onClick={() => setSortMethod(SortMethod.ByLength)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button is-warning', {
            'is-light': direction !== 'reverse',
          })}
          onClick={() =>
            setDirection(direction === 'straight' ? 'reverse' : 'straight')
          }
        >
          Reverse
        </button>

        {(sortMethod !== undefined || direction !== 'straight') && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => resetSort()}
          >
            Reset
          </button>
        )}
      </div>

      <GoodsList list={sortedGoods} />
    </div>
  );
};
