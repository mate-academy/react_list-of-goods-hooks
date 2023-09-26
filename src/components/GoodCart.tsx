type Props = {
  good: string,
};

export const GoodCart: React.FC<Props> = ({ good }) => (
  <li data-cy="Good">
    {good}
  </li>
);
