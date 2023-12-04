import React from 'react';

type Props = {
  data: string[]
};

export const DataList: React.FC<Props> = ({ data }) => (
  <ul>
    {data.map(item => (
      <li data-cy="Good" key={item}>{item}</li>
    ))}
  </ul>
);
