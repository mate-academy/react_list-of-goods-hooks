import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

export const goodsFromServer: string[] = [
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

type SelectedFilter = 'alphabetically' | 'length' | 'reverse' | '';

export const App: React.FC = () => {
  const [goods, setGoods] = useState(goodsFromServer);
  const [selecteFilter, setSelectedFilter] = useState<SelectedFilter>('');
  const [isReversed, setIsReversed] = useState(false);

  function handleSortGoodsAlphabetically() {
    if (isReversed) {
      setGoods([...goods].sort((a, b) => b.localeCompare(a)));
      setSelectedFilter('alphabetically');

      return;
    }

    setGoods([...goods].sort((a, b) => a.localeCompare(b)));
    setSelectedFilter('alphabetically');
  }

  function handleSortGoodsByLength() {
    if (isReversed) {
      setGoods([...goods].sort((a, b) => b.length - a.length));
      setSelectedFilter('length');

      return;
    }

    setSelectedFilter('length');
    setGoods([...goods].sort((a, b) => a.length - b.length));
  }

  function handleReverseGoods() {
    setGoods([...goods].reverse());
    setIsReversed(!isReversed);
  }

  function handleResetGoods() {
    setGoods(goodsFromServer);
    setIsReversed(false);
    setSelectedFilter('');
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={handleSortGoodsAlphabetically}
          className={`button is-info ${selecteFilter === 'alphabetically' ? ' ' : 'is-light'}`}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={handleSortGoodsByLength}
          className={`button is-success ${selecteFilter === 'length' ? ' ' : 'is-light'}`}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={handleReverseGoods}
          className={`button is-warning ${isReversed ? ' ' : 'is-light'}`}
        >
          Reverse
        </button>
        {isReversed || selecteFilter.length > 0 ? (
          <button
            type="button"
            onClick={handleResetGoods}
            className={`button is-danger`}
          >
            Reset
          </button>
        ) : null}
      </div>

      <ul>
        {goods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
