type GoodsListProps = {
  goods: string[];
};

export const GoodsList: React.FC<GoodsListProps> = ({ goods }) => (
  <ul>
    {goods.map((good) => (
      <li data-cy="Good" key={good}>
        {good}
      </li>
    ))}
  </ul>
);
