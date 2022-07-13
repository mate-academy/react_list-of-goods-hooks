import React, { useState } from 'react';

enum Sort {
  Length = 'length',
  Alphabet = 'alphabet',
  Reset = 'reset',
}

type Props = {
  goods: string[];
};

export const GoodsList: React.FC<Props> = (props) => {
  const [isReversed, setReversed] = useState(false);
  const [sortBy, setSortType] = useState(Sort.Reset);
  const [minLen, setMinLen] = useState(1);
  const [...goods] = props.goods.filter(product => product.length >= minLen);

  goods.sort((p1, p2) => {
    switch (sortBy) {
      case Sort.Length:
        return p1.length - p2.length;

      case Sort.Alphabet:
        return p1.localeCompare(p2);

      default:
        return 0;
    }
  });

  if (isReversed) {
    goods.reverse();
  }

  const reverse = () => {
    setReversed(!isReversed);
  };

  const handleSortBy = (
    _: React.MouseEvent<HTMLButtonElement>,
    sortType: Sort,
  ) => {
    if (sortType === Sort.Reset) {
      setMinLen(1);
    }

    setReversed(false);
    setSortType(sortType);
  };

  const filterByLenght = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setMinLen(Number(event.target.value));
  };

  return (
    <div className="box is-small">
      <ul className="Goods__list content is-medium">
        {goods.map((product) => (
          <li className="Goods__item" key={product}>
            {product}
          </li>
        ))}
      </ul>

      <div className="buttons">
        <button
          className="button is-success"
          type="button"
          onClick={(event) => handleSortBy(event, Sort.Alphabet)}
        >
          Sort alphabetically
        </button>

        <button
          className="button is-success"
          type="button"
          onClick={(event) => handleSortBy(event, Sort.Length)}
        >
          Sort by length
        </button>

        <button
          className="button is-warning"
          type="button"
          onClick={reverse}
        >
          Reverse
        </button>

        <button
          className="button is-danger"
          type="button"
          onClick={(event) => handleSortBy(event, Sort.Reset)}
        >
          Reset
        </button>
      </div>

      <div className="select is-normal is-rounded">
        <select
          name="minLen"
          id="minLen"
          value={minLen}
          onChange={filterByLenght}
        >
          {[...new Array(10)].map((_, i) => (
            <option value={i + 1}>{i + 1}</option>
          ))}
        </select>
      </div>
    </div>
  );
};
