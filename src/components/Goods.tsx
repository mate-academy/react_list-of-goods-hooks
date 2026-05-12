import { Good } from './Good';

interface Props {
  goods: string[];
}

export const Goods: React.FC<Props> = ({ goods }) => {
  return (
    <ul>
      {goods.map(good => (
        <Good good={good} key={good} />
      ))}
    </ul>
  );
};
