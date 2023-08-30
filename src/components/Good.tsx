type GoodProps = {
  name: string
};

export const Good = ({ name }: GoodProps) => {
  return <li data-cy="Good">{name}</li>;
};
