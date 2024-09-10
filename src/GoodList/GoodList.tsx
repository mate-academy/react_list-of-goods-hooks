type GoodListProps = {
  goodsFromServer: string[];
};

export const GoodList = ({ goodsFromServer }: GoodListProps) => (
  <ul>
    {goodsFromServer.map(good => (
      <li key={good} data-cy="Good">
        {good}
      </li>
    ))}
  </ul>
);
