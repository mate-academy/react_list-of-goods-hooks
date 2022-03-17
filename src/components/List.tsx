type Props = {
  list: string[];
};

export const List: React.FC<Props> = ({ list }) => {
  const listItems = list.map(item => <li key={item}>{item}</li>);

  return <ul>{listItems}</ul>;
};
