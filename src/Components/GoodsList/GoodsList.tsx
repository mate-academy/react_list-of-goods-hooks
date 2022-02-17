import React from 'react';

export type Props = {
  goods: string[];
  reversed: boolean;
  sortBy: string | 'default';
  length: string | number;
};

export const GoodsList: React.FC<Props> = ({
  goods, reversed, sortBy, length,
}) => {
  let goodsCopy = [...goods];

  if (length !== 'default') {
    goodsCopy = goodsCopy.filter((item: string) => item.length <= length);
  }

  goodsCopy.sort((good1: string, good2: string) => {
    switch (sortBy) {
      case 'letters':
        return good1.localeCompare(good2);

      case 'length':
        return good1.length - good2.length;

      default:
        return 0;
    }
  });

  if (reversed === true) {
    goodsCopy.reverse();
  }

  const goodsItems = goodsCopy.map((good: string) => (
    <li key={good}>
      {good}
    </li>
  ));

  return (
    <ul>
      {goodsItems}
    </ul>
  );
};
