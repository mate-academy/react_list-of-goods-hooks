type Props = {
  goodsList: string[];
};

export const GoodsList: React.FC<Props> = ({ goodsList }) => {
  return (
    <ul>
      {goodsList.map(good => {
        return (
          <li key={good} data-cy="Good">
            {good}
          </li>
        );
      })}
    </ul>
  );
};
