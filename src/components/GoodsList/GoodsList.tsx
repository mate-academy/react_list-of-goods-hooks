// import React from 'react';
type Props = {
  goods: string[];
};

const GoodsList: React.FC<Props> = ({ goods }) => {
  return (
    <ul className="goodList">
      {goods.map(good => (<li data-cy="Good">{good}</li>))}
    </ul>
  );
};

export default GoodsList;
