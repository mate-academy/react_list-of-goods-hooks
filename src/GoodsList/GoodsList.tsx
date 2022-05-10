type Props = {
  goods: string[];
};

export const GoodsList: React.FC<Props> = ({ goods }) => {
  return (
    <ul>
      {
        goods.map((goodName) => (
          <li key={goodName}>
            {goodName}
          </li>
        ))
      }
    </ul>
  );
};
