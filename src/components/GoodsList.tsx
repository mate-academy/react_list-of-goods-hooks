export const GoodsList: React.FC<Props> = ({ goods }) => {
  return (
    <ul
      className="goods-list"
      data-cy="Good"
    >
      {goods.map(good => (
        <li
          key={good}
          className="goods-list__item"
        >
          {good}
        </li>
      ))}
    </ul>
  );
};

type Props = {
  goods: string[]
};
