type Props = {
  list: string[];
};

export const GoodsList: React.FC<Props> = ({ list }) => (
  <ul>
    {list.map(good => (
      <li
        data-cy="Good"
        key={good}
      >
        {good}
      </li>
    ))}
  </ul>
);
