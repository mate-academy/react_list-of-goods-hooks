type ListOfGoodsProps = {
  goods: string[];
};

export const ListOfGoods: React.FC<ListOfGoodsProps> = ({ goods }) => {
  return (
    <ul>
      {goods.map((item) => (
        <li key={item} data-cy="Good">
          {item}
        </li>
      ))}
    </ul>
  );
};
