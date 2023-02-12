type Props = {
  goods: string[]
};

export const GoodsList: React.FC<Props> = ({ goods }) => {
  return (
    <ul className="goods-list">
      {goods.map(good => (
        <li
          key={good}
          data-cy="Good"
          className="goods-list__item"
        >
          {good}
        </li>
      ))}
    </ul>
  );
};
