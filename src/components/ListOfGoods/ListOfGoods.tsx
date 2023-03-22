type Props = {
  goods: string[],
};

export const ListOfGoods: React.FC<Props> = ({ goods }) => (
  <ul>
    {goods.map(good => (
      <li
        key={good}
        data-cy="Good"
      >
        {good}
      </li>
    ))}
  </ul>
);
