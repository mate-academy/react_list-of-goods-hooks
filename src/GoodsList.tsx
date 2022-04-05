import React from 'react';
// import PropTypes from 'prop-types';

type Props = {
  goods: string[],
  isReversed: boolean,
  typeOfSort: string,
  lengthMin: number
};

export const GoodsList: React.FC<Props> = (
  {
    goods, isReversed, typeOfSort, lengthMin,
  },
) => {
  let copy = [...goods].filter(good => good.length >= lengthMin);

  switch (typeOfSort) {
    case 'alpha': {
      copy = copy.sort((a, b) => a.localeCompare(b));
      break;
    }

    case 'length': {
      copy = copy.sort((a, b) => a.length - b.length);
      break;
    }

    default: {
      break;
    }
  }

  if (isReversed) {
    copy = copy.reverse();
  }

  return (
    <ul>
      {copy.map(good => (
        <li key={good}>
          {good}
          {' '}
          (
          {good.length}
          )
        </li>
      ))}
    </ul>
  );
};
