import { List, ListItem, ListSubheader } from '@material-ui/core';
import React from 'react';

interface Props {
  query: string;
  list: any[];
}

const SearchList = (props: Props) => {
  const { query, list } = props;
  return (
    <List
      subheader={<ListSubheader>{`${query}の検索結果`}</ListSubheader>}
      dense
    >
      {list.map(item => (
        <ListItem key={item} button divider>
          {item}
        </ListItem>
      ))}
    </List>
  );
};

export default SearchList;
