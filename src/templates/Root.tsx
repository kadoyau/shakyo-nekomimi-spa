import React, { useCallback, useState } from 'react';
import debounce from 'lodash.debounce';
import SearchBar from '../organisms/SearchBar';
import styles from './Root.module.css';
import SearchList from '../organisms/SearchList';
import ApiClient from '../utils/ApiClient';

const RootTemplate = () => {
  const [query, setQuery] = useState('');
  // YouTube APIの検索結果を格納するStateを定義
  const [list, setList] = useState<gapi.client.youtube.SearchResult[]>([]);

  const searchList = useCallback(
    debounce(async (q: string) => {
      if (q.trim() !== '') {
        const { items } = await ApiClient.search(q);
        setQuery(q);
        setList(items!);
      } else {
        console.log('から！！！');
        // 入力テキストが空なら結果はない
        setList([]);
      }
    }, 500), // 500ms待つ
    []
  );
  return (
    <>
      <SearchBar onChange={searchList} />
      <div className={styles.content}>
        <SearchList query={query} list={list} />
      </div>
    </>
  );
};

export default RootTemplate;
