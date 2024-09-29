import { ListItemProps } from '../../types/list/ListItemProps';

export const ListItem: React.FC<ListItemProps> = ({ good }) => (
  <li data-cy="Good">{good}</li>
);
