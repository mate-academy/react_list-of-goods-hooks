import { Good } from './Good';

type GoodsListProps = {
  goods: string[];
};

export const GoodsList: React.FC<GoodsListProps> = ({ goods }) => {
  return (
    <ul>
      {goods.map((good, index) => (
        <Good goodName={good} key={index} />
      ))}
    </ul>
  );
};
