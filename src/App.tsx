import { FC, useState } from 'react';
import classNames from 'classnames';

import './App.scss';

import { goodsFromServer } from './api/goods';
import { buttonClasses } from './api/buttonClasses';

enum SortType {
  alfabetically = 'alfabetically',
  length = 'length',
  nosort = '',
}

export const App: FC = () => {
  const [goodsVisible, setGoodsVisible] = useState(false);
  const [lenthOfWords, setSelectedLength] = useState(1);
  const [isReversed, setIsReversed] = useState(false);
  const [sortBy, setSortBy] = useState(SortType.nosort);
  const selectValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const visibleGoods = goodsFromServer.filter(
    (good) => good.length >= lenthOfWords,
  );

  visibleGoods.sort((good1, good2) => {
    switch (sortBy) {
      case SortType.alfabetically:
        return good1.localeCompare(good2);
      case SortType.length:
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
      <div className="App__title">
        <h1 className="title is-2">
          Goods
        </h1>

        {!goodsVisible
          ? (
            <button
              type="button"
              className={classNames(buttonClasses, 'is-outlined')}
              onClick={() => {
                if (!goodsVisible) {
                  setGoodsVisible(!goodsVisible);
                }
              }}
            >
              Start
            </button>
          )
          : null}

        <select
          value={lenthOfWords}
          className="select is-small"
          onChange={(element) => setSelectedLength(+element.target.value)}
        >
          {selectValues.map(value => (
            <option
              value={`${value}`}
              key={value}
            >
              {value}
            </option>
          ))}
        </select>
      </div>

      <div className="buttons has-addons">
        <button
          type="button"
          className={classNames(
            buttonClasses,
            { 'is-outlined': !isReversed },
          )}
          onClick={() => {
            setIsReversed(!isReversed);
          }}
        >
          Reverse
        </button>

        <button
          type="button"
          className={classNames(
            buttonClasses,
            { 'is-outlined': sortBy !== SortType.alfabetically },
          )}
          onClick={() => setSortBy(SortType.alfabetically)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames(
            buttonClasses,
            { 'is-outlined': sortBy !== SortType.length },
          )}
          onClick={() => setSortBy(SortType.length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames(buttonClasses, 'is-outlined')}
          onClick={() => {
            setSortBy(SortType.nosort);
            setIsReversed(false);
            setSelectedLength(1);
          }}
        >
          Reset
        </button>
      </div>

      {goodsVisible && (
        <ul className="goods">
          {visibleGoods.map(good => (
            <li key={good} className="content is-medium box">
              {good}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
