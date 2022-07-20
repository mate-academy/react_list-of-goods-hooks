import React, { useState } from 'react';
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

enum SortType {
  NONE = 'none',
  ALPABET = 'alphabet',
  LENGTH = 'length',
}

function getReorderedGoods(
  goods: string[],
  sortType: SortType,
  isReversed: boolean,
  minLength: number,
) {
  const visibleGoods = goods.filter(element => (
    element.length >= minLength
  ));

  switch (sortType) {
    case SortType.ALPABET:
      visibleGoods.sort((good1, good2) => good1.localeCompare(good2));
      break;
    case SortType.LENGTH:
      visibleGoods.sort((good1, good2) => good1.length - good2.length);
      break;
    default:
  }

  return isReversed ? visibleGoods.reverse() : visibleGoods;
}

export const App: React.FC = () => {
  const [isStarted, setIsStarted] = useState(false);
  const [isReversed, setIsReversed] = useState(false);
  const [sortType, setSortType] = useState(SortType.NONE);
  const [lengthValue, setLengthValue] = useState(1);

  const handleEvent = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setLengthValue(+event.target.value);
  };

  const reorderedGoods = getReorderedGoods(
    goodsFromServer,
    sortType,
    isReversed,
    lengthValue,
  );

  return (
    <div className="App box has-background-warning-light">
      {!isStarted
        ? (
          <button
            type="button"
            onClick={() => {
              setIsStarted(true);
            }}
            className="button is-success is-light"
          >
            Start
          </button>
        ) : (
          <>
            <div className="buttons">
              <button
                type="button"
                onClick={() => {
                  setSortType(SortType.ALPABET);
                }}
                className="button is-info is-light"
              >
                Sort alphabetically
              </button>

              <button
                type="button"
                onClick={() => {
                  setSortType(SortType.LENGTH);
                }}
                className="button is-info is-light"
              >
                Sort by length
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsReversed(!isReversed);
                }}
                className="button is-info is-light"
              >
                Reverse
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsReversed(false);
                  setSortType(SortType.NONE);
                  setLengthValue(1);
                }}
                className="button is-danger is-light"
              >
                Reset
              </button>
            </div>

            <ul className="Goods content is-large block">
              {reorderedGoods.map(product => (
                <li
                  className="Goods__item"
                  key={product}
                >
                  {product}
                </li>
              ))}
            </ul>

            <div>
              <p className="text">Select min length of word:</p>

              <div className="select is-multiply is-success block">
                <select name="minWordLength" onChange={handleEvent}>
                  {[...Array(10)].map((_, i) => (
                    <option value={i + 1}>{i + 1}</option>
                  ))}
                </select>
              </div>
            </div>
          </>
        )}
    </div>
  );
};
