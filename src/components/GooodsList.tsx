import { Good } from './Good';

type GoddsListProps = {
  goods: string[]
};

export const GoodsList = ({ goods }: GoddsListProps) => {
  return (
    <ul>
      {goods.map(good => <Good name={good} key={goods.indexOf(good)} />)}
    </ul>
  );
};
