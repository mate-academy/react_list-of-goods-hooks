import React from "react";
import GoodPage from '../GoodPage/Good';

type Props = {
  goods: string[];
};

const GoodList: React.FC<Props> = ({ goods }) => {
  return (
    <ul>
      {goods.map(item => {
        return <GoodPage good={item} key={item} />;
      })}
    </ul>
  );
};

export default GoodList;
