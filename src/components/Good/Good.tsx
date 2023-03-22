import { FC } from 'react';

type Props = {
  good: string;
};

export const Good: FC<Props> = ({ good }) => (
  <li data-cy="Good">
    {good}
  </li>
);
