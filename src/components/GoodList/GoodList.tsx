type GoodListProps = {
  goods: string[];
};

export const GoodList: React.FC<GoodListProps> = ({ goods }) => (
  <ul>
    {goods.map(good => (
      <li data-cy="Good" key={good}>
        {good}
      </li>
    ))}
  </ul>
);
