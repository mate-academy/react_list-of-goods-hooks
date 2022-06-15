import React from 'react';

type Props = {
  goodsFromServer: string[],
  isReversed: boolean,
  sortByValue: string,
  selectValue: number,
};

export const GoodsList:React.FC<Props> = ({
  goodsFromServer,
  isReversed,
  sortByValue,
  selectValue,
}) => {
  const visibleGoods = [...goodsFromServer];

  switch (sortByValue) {
    case 'alphabetically':
      visibleGoods.sort((el1, el2) => el1.localeCompare(el2));
      break;

    case 'length':
      visibleGoods.sort((el1, el2) => el1.length - el2.length);
      break;

    default:
      break;
  }

  if (isReversed) {
    visibleGoods.reverse();
  }

  const filteredGoods = visibleGoods.filter(el => el.length <= selectValue);

  return (
    <ul>
      {filteredGoods
        .map(good => <li key={good}>{good}</li>)}
    </ul>
  );
};
