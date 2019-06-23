import { List, ListItem, ListItemText, ListSubheader } from '@material-ui/core';
import React, { useCallback } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import styles from './SearchList.module.css';

interface Props extends RouteComponentProps {
  query: string;
  list: gapi.client.youtube.SearchResult[];
}

const SearchList = (props: Props) => {
  const { query, list, history } = props;
  const createHandleClick = useCallback((videoId: string) => {
    return () => history.push(`/watch/${videoId}`);
  }, []);

  return (
    <List
      subheader={<ListSubheader>{`${query}の検索結果`}</ListSubheader>}
      dense
    >
      {list.map(item => {
        const { id, etag, snippet } = item;
        return (
          <ListItem
            key={etag!}
            onClick={createHandleClick(id!.videoId!)}
            button
            divider
          >
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

// withRouterでWrapするとhistoryオブジェクトが自動的にPropsに渡される
export default withRouter(SearchList);
