interface Props {
  good: string;
  key: string;
}

export const Good: React.FC<Props> = ({ good }) => (
  <li data-cy="Good">
    {good}
  </li>
);
