import { List, ListItem, ListItemText, ListSubheader } from '@material-ui/core';
import React from 'react';
import styles from './SearchList.module.css';

interface Props {
  query: string;
  list: gapi.client.youtube.SearchResult[];
}

const SearchList = (props: Props) => {
  const { query, list } = props;
  return (
    <List
      subheader={<ListSubheader>{`${query}の検索結果`}</ListSubheader>}
      dense
    >
      {list.map(item => {
        const { etag, snippet } = item;
        return (
          <ListItem key={etag!} button divider>
            <img
              className={styles.thumbnail}
              src={snippet!.thumbnails!.default!.url!}
              alt={snippet!.title}
            />
            <ListItemText primary={snippet!.title} />
          </ListItem>
        );
      })}
    </List>
  );
};

export default SearchList;
