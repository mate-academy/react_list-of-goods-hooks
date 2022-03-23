export const GoodsList: React.FC<Props> = ({ goods }) => {
  return (
    <ul className="goods-list">
      {goods.map(good => (
        <li className="goods-list__item">{good}</li>
      ))}
    </ul>
  );
};

type Props = {
  goods: string[]
};
