import { FC, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import cn from 'classnames';
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

const ids = new Array<string>(goodsFromServer.length)
  .fill('')
  .map(el => el + uuidv4());
const minLengths = new Array(goodsFromServer.length)
  .fill('')
  .map((el, i) => ({ id: el + uuidv4(), option: i + 1 }));

enum SortType {
  NONE,
  ALPABET,
  LENGTH,
}

function getReorderedGoods(
  goods: string[],
  minLen: number,
  sortType: SortType,
  isReversed: boolean,
) {
  const visibleGoods = [...goods].filter(good => good.length >= minLen);

  if (sortType !== SortType.NONE) {
    visibleGoods.sort((a, b) => {
      if (sortType === SortType.ALPABET) {
        return a.localeCompare(b);
      }

      return a.length - b.length;
    });
  }

  if (isReversed) {
    visibleGoods.reverse();
  }

  return visibleGoods;
}

export const App: FC = () => {
  const [isStarted, setIsStarted] = useState(false);
  const [isReversed, setIsReversed] = useState(false);
  const [sortType, setSortType] = useState(SortType.NONE);
  const [minLengthFilter, setMinLengthFilter] = useState(1);

  const goods = getReorderedGoods(
    goodsFromServer,
    minLengthFilter,
    sortType,
    isReversed,
  );

  return (
    <div className="App box">
      {!isStarted
        ? (
          <button
            className="button is-primary is-large"
            type="button"
            onClick={() => setIsStarted(true)}
          >
            Start
          </button>
        )
        : (
          <div className="App__content">
            <div className="App__buttons">
              <button
                className={cn(
                  'button is-primary',
                  { 'is-light': sortType === SortType.ALPABET },
                )}
                type="button"
                onClick={() => {
                  setIsReversed(prevIsReverse => (sortType === SortType.ALPABET
                    ? !prevIsReverse
                    : false
                  ));
                  setSortType(SortType.ALPABET);
                }}
              >
                Sort alphabetically
              </button>

              <button
                className={cn(
                  'button is-primary',
                  { 'is-light': sortType === SortType.LENGTH },
                )}
                type="button"
                onClick={() => {
                  setIsReversed(prevIsReverse => (sortType === SortType.LENGTH
                    ? !prevIsReverse
                    : false
                  ));
                  setSortType(SortType.LENGTH);
                }}
              >
                Sort by length
              </button>

              <button
                className={cn(
                  'button is-primary',
                  { 'is-light': isReversed },
                )}
                type="button"
                onClick={() => setIsReversed(prevIsReverse => !prevIsReverse)}
              >
                Reverse
              </button>

              <button
                className="button is-danger is-large is-reset"
                type="button"
                onClick={() => {
                  setSortType(SortType.NONE);
                  setMinLengthFilter(1);
                  setIsReversed(false);
                }}
              >
                Reset
              </button>

              <select
                className="select is-primary is-medium"
                name="minLength"
                value={minLengthFilter}
                onChange={(event) => setMinLengthFilter(+event.target.value)}
              >
                {minLengths.map(({ id, option }) => (
                  <option value={option} key={id}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <ul className="Goods content is-medium">
              {goods.map((good, index) => (
                <li className="Goods__item" key={ids[index]}>
                  {good}
                </li>
              ))}
            </ul>
          </div>
        )}
    </div>
  );
};
