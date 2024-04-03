interface Props {
  goods: string[];
}

export const GoodList: React.FC<Props> = ({ goods }) => {
  return (
    <ul>
      {goods.map((good: string) => (
        <li key={good} data-cy="Good">
          {good}
        </li>
      ))}
    </ul>
  );
};
