type GoodsListProps = {
  goods: string[];
};

export function GoodsList({ goods }: GoodsListProps) {
  return (
    <ul>
      {goods.map(good => (
        <li data-cy="Good" key={good}>
          {good}
        </li>
      ))}
    </ul>
  );
}
