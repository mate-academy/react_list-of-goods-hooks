import React from 'react';
import { Good } from '../Good/Good';

interface IGood {
  good: string;
}

type Good = {
  good: IGood
}

type Props = {
  goods: Good[]
}

export const GoodList:React.FC<Props> = ({goods}) => {
  return (
    <ul>
      {goods.map((good:Good) => {
        return <Good good={good} />;
      })}
    </ul>
  );
};
