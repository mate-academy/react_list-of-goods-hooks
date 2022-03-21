import classNames from 'classnames';
import React, { useState } from 'react';
import './App.scss';
import GoodsList from './components/GoodsList';
import Options from './components/Options';

const goodsFromServer: string[] = [
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

enum SortBy {
  none,
  alphabet,
  length,
}

const App: React.FC = () => {
  const [isReversed, setIsReversed] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [sortBy, setSortBy] = useState(SortBy.none);
  const [minLength, setMinLength] = useState(1);

  const reset = () => {
    setIsReversed(false);
    setSortBy(SortBy.none);
    setMinLength(1);
  };

  const preparedGoods = [...goodsFromServer]
    .filter(e => e.length >= minLength);

  preparedGoods.sort((a, b) => {
    switch (sortBy) {
      case SortBy.alphabet:
        return a.localeCompare(b);

      case SortBy.length:
        return a.length - b.length;

      default:
        return 0;
    }
  });

  if (isReversed) {
    preparedGoods.reverse();
  }

  return (
    <div className="App">
      <h1 className="App__title">Goods</h1>

      {!isVisible && (
        <button
          className="button"
          type="button"
          onClick={() => setIsVisible(true)}
        >
          Start
        </button>
      )}

      {isVisible && (
        <div className="App__controller">
          <button
            className={classNames('button', {
              'button--active': isReversed,
            })}
            type="button"
            onClick={() => setIsReversed(!isReversed)}
          >
            Reverse
          </button>

          <button
            className={classNames('button', {
              'button--active': sortBy === SortBy.alphabet,
            })}
            type="button"
            onClick={() => setSortBy(SortBy.alphabet)}
          >
            Sort alphabetically
          </button>

          <button
            className={classNames('button', {
              'button--active': sortBy === SortBy.length,
            })}
            type="button"
            onClick={() => setSortBy(SortBy.length)}
          >
            Sort by length
          </button>

          <button
            className="button"
            type="button"
            onClick={reset}
          >
            Reset
          </button>

          <select
            className="button"
            name="minLength"
            id="minLength"
            value={minLength}
            onChange={(e) => setMinLength(+e.target.value)}
          >
            <Options length={10} />
          </select>

        </div>
      )}

      {isVisible && (
        <GoodsList goods={preparedGoods} className="App__list" />
      )}
    </div>
  );
};

export default App;
