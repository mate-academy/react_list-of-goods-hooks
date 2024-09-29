import { ListItem } from './ListItem';
import { ListProps } from '../../types/list/ListProps';

export const GoodsList: React.FC<ListProps> = ({ goods }) => {
  return (
    <ul>
      {goods.map(good => (
        <ListItem good={good} key={good} />
      ))}
    </ul>
  );
};
