import React, { useState } from 'react';

enum SortType {
  NONE,
  ALPABET,
  LENGTH,
}

type Props = {
  goods: string[],
};

function getReorderedGoods(
  goods: string[],
  sortType: SortType,
  isReversed: boolean,
) {
  const visibleGoods = [...goods];

  visibleGoods.sort((g1, g2) => {
    switch (sortType) {
      case SortType.ALPABET:
        return g1.localeCompare(g2);

      case SortType.LENGTH:
        return g1.length - g2.length;
      default:
        return 0;
    }
  });

  if (isReversed) {
    return visibleGoods.reverse();
  }

  return visibleGoods;
}

export const ListOfGoods: React.FC<Props> = ({ goods }: Props) => {
  const [sortType, setType] = useState(SortType.NONE);
  const [isReversed, setReverse] = useState(false);

  const goodsList = getReorderedGoods(goods, sortType, isReversed);

  return (
    <>
      <div className="button  level-item ">
        <button
          type="button"
          className="button is-link"
          onClick={() => {
            setType(SortType.ALPABET);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className="button is-success"
          onClick={() => {
            setType(SortType.LENGTH);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className="button is-warning"
          onClick={() => {
            setReverse(rev => !rev);
          }}
        >
          Reverse
        </button>

        <button
          type="button"
          className="button is-danger"
          onClick={() => {
            setType(SortType.NONE);
            setReverse(false);
          }}
        >
          Reset
        </button>
      </div>

      <ul className="Goods">
        {goodsList.map(good => (
          <li
            key={good}
            className="Goods__item has-text-centered "
          >
            {good}

          </li>
        ))}
      </ul>
    </>
  );
};
