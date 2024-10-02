interface ListItemProps {
  good: string;
}

export const ListItem: React.FC<ListItemProps> = ({ good }) => (
  <li data-cy="Good">{good}</li>
);
