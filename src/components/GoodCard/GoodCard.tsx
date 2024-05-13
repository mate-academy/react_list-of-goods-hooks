import { GoodType } from '../../types/GoodType';

interface Props {
  good: GoodType;
}

export const GoodCard: React.FC<Props> = ({ good }) => (
  <li data-cy="Good">{good}</li>
);
