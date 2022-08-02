/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { GoodsList } from './components/goodsList';
import './App.css';

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

export const App = () => {
  const [isReversed, setReverse] = useState(false);
  const [isStarted, setStart] = useState(true);
  const [sortType, setSort] = useState('');

  const visibleGoods = [...goodsFromServer];

  visibleGoods.sort((good: any, nextGood: any) => {
    switch (sortType) {
      case 'alphabetically':
        return good.localeCompare(nextGood);

      case 'by length':
        return good.length - nextGood.length;
      default:
        return 0;
    }
  });

  if (isReversed) {
    visibleGoods.reverse();
  }

  return (
    <>
      <div className="App">
        {isStarted && (
          <button
            type="button"
            onClick={() => setStart(false)}
          >
            Start
          </button>
        )}

        {!isStarted && (
          <>
            <button type="button" onClick={() => setSort('alphabetically')}>
              Sort alphabetically
            </button>

            <button type="button" onClick={() => setSort('by length')}>
              Sort by length
            </button>

            <button type="button" onClick={() => setReverse(true)}>
              Reverse
            </button>

            <button
              type="button"
              onClick={() => {
                setReverse(false);
                setSort('');
              }}
            >
              Reset
            </button>

            <GoodsList goods={visibleGoods} />
          </>
        )}
      </div>
    </>

  );
};
