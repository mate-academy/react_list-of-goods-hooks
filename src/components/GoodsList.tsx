import React from 'react';

type Props = {
  data: string[],
  revers: boolean,
  typeSort: string;
  fildSize: number;
};

export const GoodsList:React.FC<Props> = (
  {
    data,
    revers,
    typeSort,
    fildSize,
  },
) => {
  const visibility = [...data].slice(0, fildSize);

  visibility.sort((prev, next) => {
    switch (typeSort) {
      case 'alfabet':
        return prev.localeCompare(next);
      case 'length':
        return next.length - prev.length;
      default: return -1;
    }
  });

  if (revers) {
    visibility.reverse();
  }

  // eslint-disable-next-line no-console
  console.log('render');

  return (
    <ul className="list-group">
      {visibility.map(good => (
        <li className="list-group-item" key={good}>
          {good}
          {revers}
        </li>
      ))}
    </ul>
  );
};
