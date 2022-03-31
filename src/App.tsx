import React, { useState } from 'react';
import { GoodsList } from './components/GoodsList';

import './App.scss';

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

export const App: React.FC = () => {
  const [isVisible, setVivible] = useState(false);
  const [isReverse, setReverse] = useState(false);
  const [sortBy, setSortBy] = useState('');
  const [length, setLength] = useState(1);

  const reset = () => {
    setReverse(false);
    setSortBy('');
    setLength(1);
  };

  const visibleGoodsList = goodsFromServer.filter(good => good.length >= length);

  switch (sortBy) {
    case 'string':
      visibleGoodsList.sort((a, b) => a.localeCompare(b));
      break;
    case 'number':
      visibleGoodsList.sort((a, b) => a.length - b.length);
      break;
    default:
      break;
  }

  if (isReverse) {
    visibleGoodsList.reverse();
  }

  return (
    <div className="App">
      {!isVisible
        && (
          <button
            type="button"
            className="button button--start"
            onClick={() => setVivible(true)}
          >
            start
          </button>
        )}
      {isVisible && (
        <div className="goods">
          <div className="goods__control-buttons">
            <button
              type="button"
              className="button goods__button"
              onClick={() => setReverse(current => !current)}
            >
              Reverse
            </button>
            <button
              type="button"
              className="button goods__button"
              onClick={() => setSortBy('string')}
            >
              Alphabetically
            </button>
            <button
              type="button"
              className="button goods__button"
              onClick={() => setSortBy('number')}
            >
              Length
            </button>
            <div className="wrapper goods__input-wrapper">
              <input
                className="button goods__button button--number"
                type="number"
                min="1"
                max="10"
                step="1"
                value={length}
                onChange={({ target }) => (
                  setLength(+target.value)
                )}
              />
              <span className="wrapper__button wrapper__button--plus">+</span>
              <span className="wrapper__button wrapper__button--minus">-</span>
            </div>
            <button
              type="button"
              className="button goods__button"
              onClick={reset}
            >
              Reset
            </button>
          </div>
          <GoodsList goods={visibleGoodsList} />
        </div>
      )}
    </div>
  );
};
