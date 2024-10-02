import { ListItem } from './ListItem';

interface ListProps {
  goods: string[];
}

export const GoodsList: React.FC<ListProps> = ({ goods }) => {
  return (
    <ul>
      {goods.map(good => (
        <ListItem good={good} key={good} />
      ))}
    </ul>
  );
};
