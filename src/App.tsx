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

enum TypeSort {
  alphabetical,
  length,
  reset,
}

export const App: React.FC = () => {
  const IS_LIGHT = TypeSort.reset;
  const [sortFlag, setSortFlag] = useState<TypeSort>(IS_LIGHT);
  const [visibileGoods, setVisibileGoods] = useState(goodsFromServer);
  const [isReversed, setIsReversed] = useState(false);

  const reset = () => {
    setSortFlag(TypeSort.reset);
    setIsReversed(false);
    setVisibileGoods(goodsFromServer);
  };

  const sortByItems = () => {
    setSortFlag(TypeSort.alphabetical);
    setVisibileGoods(
      [...visibileGoods].sort((item1, item2) => item1.localeCompare(item2)),
    );
  };

  const toggleReverse = () => {
    setIsReversed(prevState => {
      const newState = !prevState;

      setVisibileGoods([...visibileGoods].reverse());

      return newState;
    });
  };

  const sortByLength = () => {
    setSortFlag(TypeSort.length);
    setVisibileGoods(
      [...visibileGoods].sort((good1, good2) => good1.length - good2.length),
    );
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={sortByItems}
          type="button"
          className={cn('button is-info', {
            'is-light': sortFlag === TypeSort.alphabetical,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={sortByLength}
          type="button"
          className={cn('button is-success', {
            'is-light': sortFlag === TypeSort.length,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={toggleReverse}
          type="button"
          className={cn('button is-warning', {
            'is-light': isReversed === true,
          })}
        >
          Reverse
        </button>

        {JSON.stringify(goodsFromServer) !== JSON.stringify(visibileGoods) && (
          <button
            onClick={reset}
            type="button"
            className={cn('button is-danger', {
              'is-light': sortFlag === TypeSort.reset,
            })}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibileGoods.map(item => {
          return <li key={item}>{item}</li>;
        })}
      </ul>
    </div>
  );
};
