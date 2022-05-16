import React, { useState } from 'react';
import './GoodsList.scss';

enum SortBy {
  Length = 'length',
  Alphabet = 'alphabet',
  None = '',
}

type Props = {
  listOfgoods: string[];
};

export const GoodsList: React.FC<Props> = ({ listOfgoods }) => {
  const [isReverse, setIsReverse] = useState(false);
  const [sortBy, setSortBy] = useState(SortBy.None);
  const [wordLength, setWordLength] = useState(1);

  const newGoodsList = listOfgoods.filter(word => word.length >= wordLength);

  switch (sortBy) {
    case SortBy.Alphabet:
      newGoodsList.sort(
        (prevGood, nextGood) => prevGood.localeCompare(nextGood),
      );
      break;

    case SortBy.Length:
      newGoodsList.sort(
        (prevGood, nextGood) => prevGood.length - nextGood.length,
      );
      break;

    default:
      break;
  }

  if (isReverse) {
    newGoodsList.reverse();
  }

  const sortByAlphabet = () => {
    setSortBy(SortBy.Alphabet);
  };

  const sortByLength = () => {
    setSortBy(SortBy.Length);
  };

  const handleChange = (value: number) => {
    setWordLength(value);
  };

  const reversed = () => {
    setIsReverse(!isReverse);
  };

  const reset = () => {
    setIsReverse(false);
    setSortBy(SortBy.None);
    setWordLength(1);
  };

  return (
    <div>
      <div>
        <button
          type="button"
          onClick={reversed}
          className="GoodsList__button"
        >
          Reverse
        </button>

        <button
          type="button"
          onClick={sortByAlphabet}
          className="GoodsList__button"
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={sortByLength}
          className="GoodsList__button"
        >
          Sort by length
        </button>

        <select
          onChange={
            event => handleChange(Number(event.target.value))
          }
          value={wordLength}
          className="GoodsList__button"
        >
          {
            Array.from({ length: 10 }, (_, i) => i + 1).map(num => (
              <option value={num} key={num}>{`Word length >= ${num}`}</option>
            ))
          }
        </select>

        <button
          type="button"
          onClick={reset}
          className="GoodsList__button"
        >
          Reset
        </button>
      </div>

      <ul>
        {
          newGoodsList.map((item) => (
            <li key={item} className="GoodsList__item">
              {item}
            </li>
          ))
        }
      </ul>
    </div>
  );
};
