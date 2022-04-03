import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import './App.scss';

import { SortBy } from './types/SortBy';
import { Good } from './types/Good';
import { GoodsList } from './components/GoodsList';

const goodsFromServer: Good[] = [
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
].map(good => ({
  name: good,
  id: uuidv4(),
}));

const App: React.FC = () => {
  const [isVisible, setVisibility] = useState(false);
  const [isReversed, setReverse] = useState(false);
  const [sortBy, setSortBy] = useState(SortBy.none);

  const showComponent = () => {
    setVisibility(current => !current);
  };

  const reverseGoods = () => {
    setReverse(current => !current);
  };

  const toSortBy = (value: SortBy) => {
    setSortBy(value);
  };

  const reset = () => {
    setReverse(false);
    setSortBy(SortBy.none);
  };

  const sortGoods = (visibleGoods: Good[]) => {
    visibleGoods.sort((good1, good2) => {
      switch (sortBy) {
        case SortBy.alphabet:
          return good1.name.localeCompare(good2.name);
        case SortBy.length:
          return good1.name.length - good2.name.length;
        default:
          return 0;
      }
    });
  };

  const preparedGoods = [...goodsFromServer];

  sortGoods(preparedGoods);

  if (isReversed) {
    preparedGoods.reverse();
  }

  return (
    <div className="App">
      <h1 className="App__title">Goods</h1>
      {
        isVisible
          ? (
            <>
              <GoodsList goods={preparedGoods} />

              <div className="actions">
                <button
                  type="button"
                  className="actions__button"
                  onClick={() => {
                    reverseGoods();
                  }}
                >
                  Reverse
                </button>

                <button
                  type="button"
                  className="actions__button"
                  onClick={() => {
                    toSortBy(SortBy.alphabet);
                  }}
                >
                  Sort alphabetically
                </button>

                <button
                  type="button"
                  className="actions__button"
                  onClick={() => {
                    toSortBy(SortBy.length);
                  }}
                >
                  Sort by length
                </button>

                <button
                  type="button"
                  className="actions__button actions__button--reset"
                  onClick={() => {
                    reset();
                  }}
                >
                  Reset
                </button>
              </div>
            </>
          )
          : (
            <button
              type="button"
              className="start-button"
              onClick={() => {
                showComponent();
              }}
            >
              Start
            </button>
          )
      }
    </div>
  );
};

export default App;
