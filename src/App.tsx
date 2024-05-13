import 'bulma/css/bulma.css';
import './App.scss';
import React, { useState } from 'react';
import { GoodList } from './GoodList/index';

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

type SortType = 'none' | 'alphabetical' | 'length';

export const App: React.FC = () => {
  const [sortedState, setSortedState] = useState<SortType>('none');
  const [reverseList, setReverseList] = useState<boolean>(false);
  const [changedGoods, setChangedGoods] = useState<string[]>(goodsFromServer);

  const handleAlphaSort = (): void => {
    if (sortedState !== 'alphabetical') {
      setSortedState('alphabetical');

      if (reverseList) {
        setChangedGoods(
          [...changedGoods].sort((a, b) => a.localeCompare(b)).reverse(),
        );
      } else {
        setChangedGoods([...changedGoods].sort((a, b) => a.localeCompare(b)));
      }
    }
  };

  const handleLengthSort = (): void => {
    if (sortedState !== 'length') {
      setSortedState('length');

      if (reverseList) {
        setChangedGoods([...changedGoods].sort((a, b) => b.length - a.length));
      } else {
        setChangedGoods([...changedGoods].sort((a, b) => a.length - b.length));
      }
    }
  };

  const handleReverse = (): void => {
    setReverseList(!reverseList);
    setChangedGoods([...changedGoods].reverse());
  };

  const handleReset = (): void => {
    setChangedGoods(goodsFromServer);
    setSortedState('none');
    setReverseList(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortedState === 'alphabetical' ? '' : 'is-light'}`}
          onClick={handleAlphaSort}
        >
          Sort alphabetically
        </button>
        <button
          type="button"
          className={`button is-success ${sortedState === 'length' ? '' : 'is-light'}`}
          onClick={handleLengthSort}
        >
          Sort by length
        </button>
        <button
          type="button"
          className={`button is-warning ${reverseList ? '' : 'is-light'}`}
          onClick={handleReverse}
        >
          Reverse
        </button>
        {(sortedState !== 'none' || reverseList) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleReset}
          >
            Reset
          </button>
        )}
      </div>
      <GoodList goodsFromServer={changedGoods} />
    </div>
  );
};
