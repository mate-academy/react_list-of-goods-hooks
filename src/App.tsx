import React, { useState } from 'react';
import './App.css';
import { GoodsList } from './GoodsLIst';

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

enum SortBy {
  ALPHABET = 'A-Z',
  LENGTH = 'Length',
  NONE = 'none',
}

export const App: React.FC = () => {
  const goods:string[] = [...goodsFromServer];
  const [itsBegin, setBegin] = useState(true);
  const [isReversed, setReversed] = useState(false);
  const [sortBy, setSortBy] = useState<SortBy>(SortBy.NONE);
  const [selectedLength, setLength] = useState(1);

  const visibleGoods = goods.filter(good => good.length >= selectedLength);

  const reset = () => {
    setLength(1);
    setReversed(false);
    setSortBy(SortBy.NONE);
  };

  const selectLenght = (value: number) => {
    setLength(value);
  };

  switch (sortBy) {
    case SortBy.ALPHABET:
      visibleGoods.sort((curGood, nextGood) => curGood.localeCompare(nextGood));
      break;

    case SortBy.LENGTH:
      visibleGoods
        .sort((curGood, nextGood) => curGood.length - nextGood.length);
      break;

    default:
      break;
  }

  if (isReversed) {
    visibleGoods.reverse();
  }

  return (
    <div className="App">
      <div className="container">
        {itsBegin
          ? (
            <button
              className="button is-success level-item"
              type="button"
              onClick={() => setBegin(false)}
            >
              Start
            </button>
          )
          : (
            <div className="message is-primary">
              <div className="message-header title is-3 level">
                <h1>Goods</h1>
                <button
                  className="button is-warning"
                  type="button"
                  onClick={() => reset()}
                >
                  Reset
                </button>
              </div>
              <div className="">
                <div className="container">
                  <GoodsList goods={visibleGoods} />
                </div>
              </div>
              <div className="buttons-container content level">
                <button
                  className="button is-primary"
                  type="button"
                  onClick={() => setReversed(!isReversed)}
                >
                  Reverse
                </button>
                <button
                  className="button is-primary"
                  type="button"
                  onClick={() => setSortBy(SortBy.ALPHABET)}
                >
                  Sort by A-Z
                </button>
                <button
                  className="button is-primary"
                  type="button"
                  onClick={() => setSortBy(SortBy.LENGTH)}
                >
                  Sort by lenght
                </button>
                <div className="select is-success">
                  <select
                    value={selectedLength}
                    onChange={({ target }) => {
                      selectLenght(Number(target.value));
                    }}
                  >
                    {Array.from(Array(11).keys()).map((item) => (
                      <option
                        key={item}
                        value={item}
                      >
                        {item}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

          )}

      </div>
    </div>
  );
};
