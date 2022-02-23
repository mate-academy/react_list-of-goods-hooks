import React, { useState } from 'react';
import './ListOfGoods.scss';

type Props = {
  goodsFromServer: string[]
};

export const ListOfGoods: React.FC<Props> = ({ goodsFromServer }) => {
  const [start, setStart] = useState(false);
  const [goodsLength, setGoodsLength] = useState(1);
  const [isReversed, setIsReversed] = useState(false);
  const [sort, setSort] = useState('');

  const goodsLengths = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const goodsList = goodsFromServer.filter(good => good.length >= goodsLength);

  const sortByAbc = () => {
    setSort('name');
  };

  const sortByLength = () => {
    setSort('length');
  };

  goodsList.sort((a, b) => {
    switch (sort) {
      case 'name':
        return a.localeCompare(b);

      case 'length':
        return a.length - b.length;

      default:
        return 0;
    }
  });

  if (isReversed) {
    goodsList.reverse();
  }

  const reset = () => {
    setGoodsLength(1);
    setIsReversed(false);
    setSort('');
  };

  return (
    <>
      {!start && (
        <button
          type="button"
          className="button"
          onClick={() => setStart(true)}
        >
          Show goods
        </button>
      )}
      {start && (
        <div className="goods">
          <ul className="goods__list">
            {goodsList.map(good => (
              <li key={good}>
                {good}
              </li>
            ))}
          </ul>
          <div className="goods__buttons">
            <label htmlFor="good">
              Show only goods having more than
              {' '}
              <select
                className="goods__select"
                name="good"
                id="good"
                onChange={(event) => setGoodsLength(+event.target.value)}
              >
                {goodsLengths.map(length => (
                  <option value={length}>{length}</option>
                ))}
              </select>
              {' '}
              letter(s).
            </label>
            <button
              type="button"
              className="button"
              onClick={() => setIsReversed(prev => !prev)}
            >
              Reverse
            </button>
            <button
              type="button"
              className="button"
              onClick={sortByAbc}
            >
              Name
            </button>
            <button
              type="button"
              className="button"
              onClick={sortByLength}
            >
              Length
            </button>
            <button
              type="button"
              className="button"
              onClick={reset}
            >
              Reset
            </button>
          </div>
        </div>
      )}
    </>
  );
};
