import React from 'react';

import { Good } from '../../types/Good';

type Props = {
  good: Good;
};

export const GoodInfo: React.FC<Props> = ({ good }) => {
  return (
    <>
      {good}
    </>
  );
};
