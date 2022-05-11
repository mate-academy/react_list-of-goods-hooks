import React, { useState } from 'react';

type Props = {
  goodsList: string[];
};

export const List: React.FC<Props> = ({ goodsList }) => {
  const [isReverse, setIsReverse] = useState(false);
  const [sortBy, setSortBy] = useState('');
  const [wordLength, setWordLength] = useState(1);
  const newGoodsList = goodsList.filter(word => word.length >= wordLength);

  switch (sortBy) {
    case 'alphabet':
      newGoodsList.sort((elem1, elem2) => elem1.localeCompare(elem2));
      break;
    case 'length':
      newGoodsList.sort((elem1, elem2) => elem1.length - elem2.length);
      break;
    default:
      break;
  }

  if (isReverse) {
    newGoodsList.reverse();
  }

  return (
    <div className="goods">
      <div className="goods__buttons">
        <button
          type="button"
          className={`goods__button ${isReverse && 'goods__button--active'}`}
          onClick={() => setIsReverse(!isReverse)}
        >
          Reverse
        </button>

        <button
          type="button"
          className={`goods__button ${sortBy === 'alphabet' && 'goods__button--active'}`}
          onClick={() => {
            const condition = sortBy === '' ? 'alphabet' : '';

            setSortBy(condition);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`goods__button ${sortBy === 'length' && 'goods__button--active'}`}
          onClick={() => {
            const condition = sortBy === '' ? 'length' : '';

            setSortBy(condition);
          }}
        >
          Sort by length
        </button>

        <select
          className={`goods__button ${wordLength !== 1 && 'goods__button--active'}`}
          onChange={event => setWordLength(Number(event.target.value))}
          value={wordLength}
        >
          <option value="1">{'Word length >= 1'}</option>
          <option value="2">{'Word length >= 2'}</option>
          <option value="3">{'Word length >= 3'}</option>
          <option value="4">{'Word length >= 4'}</option>
          <option value="5">{'Word length >= 5'}</option>
          <option value="6">{'Word length >= 6'}</option>
          <option value="7">{'Word length >= 7'}</option>
          <option value="8">{'Word length >= 8'}</option>
          <option value="9">{'Word length >= 9'}</option>
          <option value="10">{'Word length >= 10'}</option>
        </select>

        <button
          type="button"
          className="goods__button"
          onClick={() => {
            setIsReverse(false);
            setSortBy('');
            setWordLength(1);
          }}
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
