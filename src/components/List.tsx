import React from 'react';

type Props = {
  list: string[];
};

export const List: React.FC<Props> = ({ list }) => {
  return (
    <ul>
      {list.map(item => <li key={item}>{item}</li>)}
    </ul>
  );
};
