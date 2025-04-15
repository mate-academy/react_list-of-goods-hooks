import { GoodItem } from '../../types/GoodItem';

type Props = {
  item: GoodItem;
};

export const Good: React.FC<Props> = ({ item }) => (
  <li data-cy="Good">{item}</li>
);
