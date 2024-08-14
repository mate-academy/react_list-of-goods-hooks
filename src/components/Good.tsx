type GoodProps = {
  goodName: string;
};

export const Good: React.FC<GoodProps> = ({ goodName }) => {
  return <li data-cy="Good">{goodName}</li>;
};
