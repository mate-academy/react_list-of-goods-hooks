type Props = {
  visibleGoods: string[],
};

export const Goods: React.FC<Props> = (props) => {
  const { visibleGoods } = props;

  return (
    <ul>
      {visibleGoods.map(good => (
        <li data-cy="Good" key={good}>{good}</li>
      ))}
    </ul>
  );
};
