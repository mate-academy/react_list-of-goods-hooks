import { FC } from 'react';
import { Goods } from '../../types';

interface Props{
  goods:Goods
}
export const ListOfGods: FC<Props> = (props) => {
  const { goods } = props;

  return (
    <ul>
      {goods.map(good => (
        <li key={good} data-cy="Good">{good}</li>
      ))}
    </ul>
  );
};
