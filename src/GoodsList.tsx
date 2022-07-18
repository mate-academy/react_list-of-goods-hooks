import React, { useState } from 'react';

enum SortType {
  NONE,
  ALPHABET,
  LENGTH,
}

type Props = {
  goods: string[];
};

export const GoodsList: React.FC<Props> = ({ goods }) => {
  const [sortBy, setSortBy] = useState<SortType>(SortType.NONE);
  const [minLength, setMinLength] = useState<number>(1);
  const [isReversed, setIsReversed] = useState<boolean>(false);

  const listOfGoods = goods
    .filter(good => good.length >= minLength);

  if (isReversed) {
    listOfGoods.reverse();
  }

  const reset = () => {
    setIsReversed(false);
    setSortBy(SortType.NONE);
    setMinLength(1);
  };

  const filterByLength = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setMinLength(Number(event.target.value));
  };

  listOfGoods.sort((good1, good2) => {
    switch (sortBy) {
      case SortType.LENGTH:
        return good1.length - good2.length;
        break;

      case SortType.ALPHABET:
        return good1.localeCompare(good2);
        break;

      default:
        return 0;
    }
  });

  return (
    <div className="box">
      <ul className="mb-4">
        {listOfGoods.map(good => (
          <li key={good}>
            {good}
          </li>
        ))}
      </ul>

      <button
        type="button"
        className="button"
        onClick={() => setSortBy(SortType.ALPHABET)}
      >
        Sort alphabetically
      </button>

      <button
        type="button"
        className="button"
        onClick={() => setSortBy(SortType.LENGTH)}
      >
        Sort by length
      </button>

      <button
        type="button"
        className="button"
        onClick={() => setIsReversed(!isReversed)}
      >
        Reverse
      </button>

      <button
        type="button"
        className="button"
        onClick={reset}
      >
        Reset
      </button>

      <div className="select">
        <select
          name="minLength"
          id="minLength"
          value={minLength}
          onChange={filterByLength}
        >
          {
            [...new Array(10)].map((_, index) => (
              <option value={index + 1}>
                {index + 1}
              </option>
            ))
          }
        </select>
      </div>
    </div>
  );
};
