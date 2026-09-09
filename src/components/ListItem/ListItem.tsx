type ListItemProps = {
  item: string;
};

export default function ListItem({ item }: ListItemProps) {
  return <li data-cy="Good">{item}</li>;
}
