import { useState, useEffect } from 'react';
// eslint-disable-next-line import/no-cycle
import GoodsList from './GoodsList';
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

function getVisibleGoods(goods: string[], isReversed: boolean, sortBy: string) {
  const visebleGoods = [...goods];

  switch (sortBy) {
    case 'alphabet':
      visebleGoods.sort((g1, g2) => g1.localeCompare(g2));
      break;

    case 'length':
      visebleGoods.sort((g1, g2) => g1.length - g2.length);
      break;

    default:
      break;
  }

  if (isReversed) {
    visebleGoods.reverse();
  }

  return visebleGoods;
}

function App() {
  const [goods, setGoods] = useState(goodsFromServer);
  const [isVisible, setIsVisible] = useState(false);
  const [isReversed, setIsReversed] = useState(false);
  const [sortBy, setSortBy] = useState('');

  useEffect(() => {
    setGoods(goodsFromServer);
  }, [isReversed, sortBy]);

  const visebleGoods = getVisibleGoods(goods, isReversed, sortBy);

  return (
    <div className="app">
      <h1 className="app__title">
        Goods
      </h1>
      <div className="app__buttons">
        <button
          type="button"
          onClick={() => setIsVisible(!isVisible)}
        >
          {isVisible
            ? 'Hide'
            : 'Show'}
        </button>

        {isVisible
          ? (
            <>
              <button
                type="button"
                onClick={() => setIsReversed(!isReversed)}
              >
                Reverse
              </button>

              <button
                type="button"
                onClick={() => setSortBy('alphabet')}
              >
                Sort alphabetically
              </button>

              <button
                type="button"
                onClick={() => setSortBy('length')}
              >
                Sort by length
              </button>

              <button
                type="button"
                onClick={() => {
                  setSortBy('length');
                  setIsReversed(false);
                }}
              >
                Reset
              </button>
            </>
          ) : null}

      </div>

      {isVisible
        ? <GoodsList goods={visebleGoods} />
        : null}
    </div>
  );
}

export default App;
