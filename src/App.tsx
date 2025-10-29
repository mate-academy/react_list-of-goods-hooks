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
  Default,
  Alph,
  Length,
}

export const App: React.FC = () => {
  const [goods, setGoods] = useState<string[]>([...goodsFromServer]);
  const [buttonStatus, setButtonStatus] = useState<SortType>(SortType.Default);
  const [isReversed, setIsReversed] = useState<boolean>(false);

  const isInitial =
    goods.length === goodsFromServer.length &&
    goods.every((g, i) => g === goodsFromServer[i]);

  const applyReverseIfNeeded = (arr: string[]) => {
    return isReversed ? [...arr].reverse() : arr;
  };

  const sortAlph = () => {
    const sorted = [...goodsFromServer].sort((a, b) => a.localeCompare(b));

    setGoods(applyReverseIfNeeded(sorted));
    setButtonStatus(SortType.Alph);
  };

  const sortByLength = () => {
    const sorted = [...goodsFromServer].sort((a, b) => a.length - b.length);

    setGoods(applyReverseIfNeeded(sorted));
    setButtonStatus(SortType.Length);
  };

  const reverse = () => {
    setGoods(prev => [...prev].reverse());
    setIsReversed(prev => !prev);
  };

  const reset = () => {
    setGoods([...goodsFromServer]);
    setIsReversed(false);
    setButtonStatus(SortType.Default);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={sortAlph}
          className={`button is-info ${buttonStatus === SortType.Alph ? '' : 'is-light'}`}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={sortByLength}
          className={`button is-success ${buttonStatus === SortType.Length ? '' : 'is-light'}`}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={reverse}
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
        >
          Reverse
        </button>

        {!isInitial && (
          <button
            type="button"
            onClick={reset}
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(good => {
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
