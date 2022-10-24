interface Props {
  reorderedGoods: string[]
}

export const GoodsList: React.FC<Props> = ({ reorderedGoods }) => (
  <ul>
    {reorderedGoods.map(good => (
      <li key={good} data-cy="Good">
        { good }
      </li>
    ))}
  </ul>
);
