import React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

type Props = {
  goods: string[],
  sortBy: string,
  isReversed: boolean,
  filterLength: number,
};

export const Goods: React.FC<Props> = ({
  goods,
  sortBy,
  isReversed,
  filterLength,
}) => {
  let goodsSorted = [...goods];

  switch (sortBy) {
    case 'alphabet':
      goodsSorted.sort((w1, w2) => {
        return w1.localeCompare(w2);
      });
      break;
    case 'length':
      goodsSorted.sort((w1, w2) => {
        return w1.length - w2.length;
      });
      break;
    default:
      goodsSorted = [...goods];
      break;
  }

  goodsSorted = goodsSorted.filter(item => item.length >= filterLength);

  if (isReversed) {
    goodsSorted.reverse();
  }

  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <nav aria-label="secondary mailbox folders">
        <List>
          {goodsSorted.map(item => (
            <ListItem disablePadding>
              <ListItemText
                key={item}
                primary={item}
              />
            </ListItem>
          ))}
        </List>
      </nav>
    </Box>
  );
};
