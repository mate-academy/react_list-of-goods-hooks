import { FC } from 'react';

interface Props {
  goods: string[]
}

export const GoodsList: FC<Props> = (props) => {
  const { goods } = props;

  return (
    <ul>
      {goods.map(good => (
        <li
          data-cy="Good"
          key={good}
          className="box column is-info is-rounded mb-2"
        >
          {good}
        </li>
      ))}
    </ul>
  );
};
