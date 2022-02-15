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

  goodsCopy.sort((item1: string, item2: string) => {
    switch (sortBy) {
      case 'letters':
        return item1.localeCompare(item2);

      case 'length':
        return item1.length - item2.length;

      default:
        return 0;
    }
  });

  if (reversed === true) {
    goodsCopy.reverse();
  }

  const goodsItems = goodsCopy.map((item: string) => (
    <li key={item}>
      {item}
    </li>
  ));

  return (
    <ul>
      {goodsItems}
    </ul>
  );
};
