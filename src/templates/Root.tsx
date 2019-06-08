import React, { useCallback, useEffect, useState } from 'react';
import SearchBar from '../organisms/SearchBar';
import styles from './Root.module.css';
import SearchList from '../organisms/SearchList';
import ApiClient from '../utils/ApiClient';

const RootTemplate = () => {
  const [query, setQuery] = useState('');
  // YouTube APIの検索結果を格納するStateを定義
  const [list, setList] = useState<gapi.client.youtube.SearchResult[]>([]);
  const handleChange = useCallback((q: string) => {
    setQuery(q);
  }, []);

  // queryが更新されるたびにAPIを呼ぶ。useEffectはReactのrenderが終わったあとに呼ばれることが保証されている
  useEffect(() => {
    const searchList = async () => {
      const { items } = await ApiClient.search(query);
      setList(items!);
    };

    // queryに文字が入力されれば検索
    if (query.trim() !== '') {
      searchList();
    }
  }, [query]);
  return (
    <>
      <SearchBar onChange={handleChange} />
      <div className={styles.content}>
        <SearchList query={query} list={list} />
      </div>
    </>
  );
};

export default RootTemplate;
