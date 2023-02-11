import React, { useEffect } from 'react';

export const GoodsList = ({ goods, sortType, reverse }) => {
  useEffect(() => {
  // eslint-disable-next-line no-console
    console.log(`Load sortType --- [${sortType}]`);

    return () => {
      // eslint-disable-next-line no-console
      console.log(`Deleted sortType --- [${sortType}]`);
    };
  }, [sortType]);

  useEffect(() => {
  // eslint-disable-next-line no-console
    console.log(`Reverse: [${reverse}]`);
  }, [reverse]);

  return (
    <ul>
      {goods.map((good) => (
        <li data-cy="Good" key={good}>
          {good}
        </li>
      ))}
    </ul>
  );
};
