interface Props {
  good: string;
}

export const GoodItem: React.FC<Props> = ({ good }) => (
  <li data-cy="Good">{good}</li>
);
