type Props = {
  goods: string[];
};

export const Goods: React.FC<Props> = ({ goods }) => {
  return (
    <ul className="Goods">
      {
        goods.map(good => (
          <li key={good} className="Goods__item">{good}</li>
        ))
      }
    </ul>
  );
};
