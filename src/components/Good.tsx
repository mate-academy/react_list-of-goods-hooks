type GoodProps = {
  goodName: string;
  key: number;
};

export const Good: React.FC<GoodProps> = ({ goodName, key }) => {
  return (
    <li data-cy="Good" key={key}>
      {goodName}
    </li>
  );
};
