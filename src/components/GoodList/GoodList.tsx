interface Props {
  visibleGoods: string[];
}

export const GoodList: React.FC<Props> = ({ visibleGoods }) => (
  <ul>
    {visibleGoods.map(good => (
      <li key={good} data-cy="Good">
        {good}
      </li>
    ))}
  </ul>
);
