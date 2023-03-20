type Props = {
  good: string,
};

export const GoodsItem: React.FC<Props> = ({ good }) => {
  return (
    <li
      key={good}
      data-cy="Good"
    >
      {good}
    </li>
  );
};
