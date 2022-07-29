type Props = {
  arrayCopy:string[];
};

export const List: React.FC<Props> = ({ arrayCopy }) => {
  return (
    <ul className="Goods">
      {
        arrayCopy.map(element => (
          <li
            className="Goods__item"
            key={element}
          >
            {element}
          </li>
        ))
      }
    </ul>
  );
};
