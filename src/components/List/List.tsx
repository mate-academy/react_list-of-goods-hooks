import React, { useState } from 'react';
import classNames from 'classnames';
import './List.scss';

type Props = {
  goodsList: string[];
};

enum SortBy {
  Length = 'length',
  Alphabet = 'alphabet',
  None = '',
}

export const List: React.FC<Props> = ({ goodsList }) => {
  const [isReverse, setIsReverse] = useState(false);
  const [sortBy, setSortBy] = useState(SortBy.None);
  const [wordLength, setWordLength] = useState(1);

  const newGoodsList = goodsList.filter(word => word.length >= wordLength);

  switch (sortBy) {
    case SortBy.Alphabet:
      newGoodsList.sort((elem1, elem2) => elem1.localeCompare(elem2));
      break;
    case SortBy.Length:
      newGoodsList.sort((elem1, elem2) => elem1.length - elem2.length);
      break;
    default:
      break;
  }

  if (isReverse) {
    newGoodsList.reverse();
  }

  const reverse = () => {
    setIsReverse(!isReverse);
  };

  const sort = (sortType: SortBy) => {
    if (sortBy !== sortType) {
      setSortBy(sortType);
    } else {
      setSortBy(SortBy.None);
    }
  };

  const reset = () => {
    setIsReverse(false);
    setSortBy(SortBy.None);
    setWordLength(1);
  };

  return (
    <div className="goods">
      <div className="goods__buttons">
        <button
          type="button"
          className={classNames('goods__button',
            { 'goods__button--active': isReverse })}
          onClick={reverse}
        >
          Reverse
        </button>

        <button
          type="button"
          className={classNames('goods__button',
            { 'goods__button--active': sortBy === SortBy.Alphabet })}
          onClick={() => sort(SortBy.Alphabet)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('goods__button',
            { 'goods__button--active': sortBy === SortBy.Length })}
          onClick={() => sort(SortBy.Length)}
        >
          Sort by length
        </button>

        <select
          className={classNames('goods__button',
            { 'goods__button--active': wordLength !== 1 })}
          onChange={event => setWordLength(Number(event.target.value))}
          value={wordLength}
        >
          {
            Array.from({ length: 10 }, (_, i) => i + 1).map(num => (
              <option value={num} key={num}>{`Word length >= ${num}`}</option>
            ))
          }
        </select>

        <button
          type="button"
          className="goods__button"
          onClick={reset}
        >
          Reset
        </button>
      </div>

      <ul className="goods__list">
        {
          newGoodsList.map((item) => (
            <li key={item} className="goods__item">
              {item}
            </li>
          ))
        }
      </ul>
    </div>
  );
};
