type Props = {
  good: string;
};

export const GoodCard: React.FC<Props> = ({ good }) => (
  <li data-cy="Good">{good}</li>
);
