import React, { useEffect, useState } from 'react';
import './App.scss';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
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

enum Sort {
  length = 'length',
  name = 'name',
  default = 'default',
}

export const App: React.FC = () => {
  const [visible, isVisible] = useState(true);
  const [reverse, setReverse] = useState(false);
  const [switched, switchEffect] = useState(true);
  const [sort, sortBy] = useState<Sort>(Sort.default);
  const [reset, resetStatus] = useState(false);
  const [limit, setLimit] = useState(1);

  const products: string[] = [...goodsFromServer]
    .filter(product => product.length > limit);

  useEffect(() => {
    if (reverse) {
      setReverse(false);
    }
  }, [switched]);

  useEffect(() => {
    sortBy(Sort.default);
    setReverse(false);
  }, [reset]);

  switch (sort) {
    case Sort.name:
      products.sort((a, b) => a.localeCompare(b));
      break;

    case Sort.length:
      products.sort((a, b) => a.length - b.length);
      break;

    default:
      break;
  }

  if (reverse) {
    products.reverse();
  }

  return (
    <div className="App">
      {visible
        ? (
          <div className="App__buttons-block">
            <button
              type="button"
              className="button"
              onClick={() => {
                isVisible(() => !visible);
              }}
            >
              Start
            </button>
          </div>
        )
        : (
          <>
            <div className="App__buttons-block">
              <button
                type="button"
                className="button"
                onClick={() => {
                  switchEffect(() => !switched);
                  sortBy(Sort.name);
                }}
              >
                Sort by name
              </button>

              <button
                type="button"
                className="button"
                onClick={() => {
                  switchEffect(() => !switched);
                  sortBy(Sort.length);
                }}
              >
                Sort by length
              </button>

              <button
                className="button"
                type="button"
                onClick={() => setReverse(!reverse)}
              >
                Reverse
              </button>

              <button
                className="button"
                type="button"
                onClick={() => resetStatus(!reset)}
              >
                Reset
              </button>
            </div>

            <ul className="Goods">
              <h3 className="App__info">
                {products.length ? `Items on page: ${products.length}` : 'Nothing to show'}
              </h3>
              {products.map(product => (
                <li
                  className="Goods__item"
                  key={product}
                >
                  {product}
                </li>
              ))}
            </ul>

            <input
              type="range"
              defaultValue="0"
              min="1"
              max="10"
              onChange={({ target }) => setLimit(+target.value)}
            />

            <span>
              Use arrows to change limit
            </span>

            <br />

            <span>
              {`Current words are longer than ${limit} symbol('s)`}
            </span>

            <datalist id="tickmarks">
              {products.map((product, index) => (
                <option value={index + 1} key={product}> </option>
              ))}
            </datalist>
          </>
        )}
    </div>
  );
};
