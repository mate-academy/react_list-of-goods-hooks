import React, { useState } from 'react';

type Props = {
  goods: string[],
};
export const GoodsList: React.FC<Props> = ({ goods }: Props) => {
  const [goodsList, setGoodsList] = useState([...goods]);

  // switch (sortBy) {
  //   case SortType.Alphabetic:
  //     goodsList.sort((good1, good2) => good1.localeCompare(good2));
  //     break;

  //   case SortType.Length:
  //     goodsList.sort((good1, good2) => good1.length - good2.length);
  //     break;

  //   default:
  //     break;
  // }

  // if (isReversed) {
  //   goodsList.reverse();
  // }

  return (
    <>
      <ul className="goodsList">
        {goodsList.map(item => (
          <li key={item} className="">
            {item}
          </li>
        ))}
      </ul>
      <div className="buttons">
        <button
          type="button"
          onClick={() => setGoodsList([...goodsList].reverse())}
          className="button"
        >
          Reverse
        </button>
        <button
          type="button"
          onClick={() => setGoodsList(
            [...goodsList].sort((a, b) => a.localeCompare(b)),
          )}
          className="button"
        >
          Sort alphabetically
        </button>
        <button
          type="button"
          onClick={() => setGoodsList(
            [...goodsList].sort((a, b) => a.length - b.length),
          )}
          className="button"
        >
          Sort by length
        </button>
        <button
          type="button"
          onClick={() => setGoodsList([...goods])}
          className="button is-danger"
        >
          Reset
        </button>
      </div>
    </>
  );
};
