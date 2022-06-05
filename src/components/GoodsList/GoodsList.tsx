import React, { useState } from 'react';

type Props = {
  goodsFromServer: string[],
};

export const GoodsList: React.FC<Props> = ({ goodsFromServer }) => {
  const [goods, setGoods] = useState([...goodsFromServer]);
  const [numbersToFilter]
    = useState(Array.from(new Set([...goodsFromServer]
      .map(good => good.length)))
      .sort((a, b) => a - b)
      .reverse());

  const [selectedFilter, setFilter] = useState(numbersToFilter[0]);
  const filteredGoods = goods.filter(good => good.length <= selectedFilter);

  return (
    <>
      <h1 className="title pt-4">
        Goods List
      </h1>

      <div className="
        buttons-container
        mb-5"
      >
        <button
          type="button"
          className="
            button
            is-danger"
          onClick={() => setGoods([...goods].sort())}
        >
          sort alphabet
        </button>

        <button
          type="button"
          className="
            button
            is-warning"
          onClick={() => setGoods([...goods].reverse())}
        >
          reverse
        </button>

        <button
          type="button"
          className="
            button
            is-info"
          onClick={() => setGoods([...goods]
            .sort((a, b) => a.length - b.length))}
        >
          sort by length
        </button>

        <button
          type="button"
          className="
            button
            is-primary"
          onClick={() => setGoods([...goodsFromServer])}
        >
          reset
        </button>

        <div className="
            select
            is-primary"
        >
          <select
            name="length-filter"
            id="lengthFilter"
            onChange={event => {
              setFilter(+event.currentTarget.value);
            }}
          >
            {numbersToFilter.map(num => (
              <option
                value={num}
                key={num}
              >
                {num}
              </option>
            ))}
          </select>
        </div>
      </div>

      <ul>
        {filteredGoods.map(good => (
          <li key={good}>
            {good}
          </li>
        ))}
      </ul>
    </>
  );
};
