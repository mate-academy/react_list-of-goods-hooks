import React, { useState } from 'react';

type Props = {
  goods: string[],
};

type Sort = 'length' | 'alphabet' | 'default';

export const GoodsList: React.FC<Props> = ({ goods }) => {
  const [isReverse, setReverse] = useState<boolean>(false);
  const [sortedBy, setSortedBy] = useState<Sort>('default');
  const [lengthLimit, setLengthLimit] = useState<number>(1);

  const handleReverseBtn = () => {
    setReverse(prev => !prev);
  };

  function sortSwitch(currentSort: Sort) {
    setSortedBy(prev => {
      if (prev === currentSort) {
        return 'default';
      }

      return currentSort;
    });
  }

  const handleAlphtSortBtn = () => sortSwitch('alphabet');

  const handleLengthtSortBtn = () => sortSwitch('length');

  const handleResetBtn = () => {
    setSortedBy('default');
    setReverse(false);
    setLengthLimit(1);
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setLengthLimit(+event.target.value);
  };

  const preparedList = goods.filter(good => good.length >= lengthLimit);

  preparedList.sort((g1, g2) => {
    switch (sortedBy) {
      case 'alphabet':
        return g1.localeCompare(g2);

      case 'length':
        return g1.length - g2.length;

      default:
        return 0;
    }
  });

  if (isReverse) {
    preparedList.reverse();
  }

  return (
    <div className="columns">
      <div
        className="
          is-flex
          is-flex-direction-column
          mr-6
          column is-4 is-offset-8
        "
      >
        <button
          type="button"
          onClick={handleResetBtn}
          className="button mb-2 is-danger"
        >
          Reset
        </button>
        <button
          type="button"
          onClick={handleReverseBtn}
          className="button mb-2 is-light"
        >
          Reverse
        </button>
        <button
          type="button"
          onClick={handleAlphtSortBtn}
          className="button mb-2 is-light"
        >
          Sort alphabetically
        </button>
        <button
          type="button"
          onClick={handleLengthtSortBtn}
          className="button mb-2 is-light"
        >
          Sort by length
        </button>

        <div>
          <span>Length &gt;= </span>

          <div className="select">
            <select
              value={lengthLimit}
              name="select"
              onChange={handleSelectChange}
              defaultValue={lengthLimit}
            >
              { Array.from(Array(11).keys()).slice(1).map(num => (
                <option
                  key={num}
                  value={num}
                >
                  {num}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <ul className="column">
        {preparedList.map(good => (
          <li
            key={good}
            className="
              panel-block
              subtitle
              is-5
            "
          >
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
