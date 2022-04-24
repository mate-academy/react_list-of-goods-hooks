import React, { useState } from 'react';
import classNames from 'classnames';
import './App.css';
import { GoodsList } from './components/GoodsList';
import { SelectOptions } from './components/SelectOptions';

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

const App: React.FC = () => {
  // const [visibleGoods, setVisibleGoods] = useState(goodsFromServer);
  const [isReversed, setIsReversed] = useState(false);
  const [sortBy, setSortBy] = useState('');
  const [selectedLength, setSelectedLength] = useState(0);
  const visibleGoods = goodsFromServer.filter(
    item => item.length >= selectedLength,
  );

  const reset = () => {
    setIsReversed(false);
    setSortBy('');
    setSelectedLength(0);
  };

  visibleGoods.sort((good1, good2) => {
    switch (sortBy) {
      case 'alphabet':
        return good1.localeCompare(good2);
      case 'length':
        return good1.length - good2.length;
      default:
        return 0;
    }
  });

  if (isReversed) {
    visibleGoods.reverse();
  }

  return (
    <div className="App">
      <h1>Goods</h1>
      <div className="App__container">
        <div className="buttons">

          <button
            className={classNames('button', { active: isReversed })}
            type="button"
            onClick={() => setIsReversed(!isReversed)}
          >
            Reverse
          </button>

          <button
            type="button"
            className={classNames(
              'button',
              sortBy === 'alphabet' ? 'active' : '',
            )}
            onClick={() => setSortBy('alphabet')}
          >
            Sort by name
          </button>

          <button
            className={classNames(
              'button',
              sortBy === 'length' ? 'active' : '',
            )}
            type="button"
            onClick={() => setSortBy('length')}
          >
            Sort by length
          </button>

          <button
            className="button reset"
            type="button"
            onClick={reset}
          >
            Reset
          </button>

          <button
            type="button"
            className="button"
          >
            <label htmlFor="selectLength">
              {'Select: '}
              <select
                id="selectLength"
                value={selectedLength}
                onChange={(event) => {
                  setSelectedLength(+event.target.value);
                }}
              >
                <SelectOptions />
              </select>
            </label>
          </button>
        </div>
        <GoodsList goods={visibleGoods} />
      </div>
    </div>
  );
};

export default App;
