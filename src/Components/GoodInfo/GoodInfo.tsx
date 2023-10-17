import { Good } from '../../types/Good';

type Props = {
  good: Good;
};

export const GoodInfo: React.FC<Props> = ({ good }) => (
  <li data-cy="Good">{good}</li>
);
