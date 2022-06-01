type Props = {
  goods: string[];
};

const List: React.FC<Props> = ({ goods }) => {
  return (
    <ul className="list-group">
      {goods.map(item => {
        return (
          <li className="list-group-item text-center" key={item}>
            {item}
          </li>
        );
      })}
    </ul>
  );
};

export default List;
