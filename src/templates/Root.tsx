import React, { useCallback, useContext, useState } from 'react';
import debounce from 'lodash.debounce';
import SearchBar from '../organisms/SearchBar';
import styles from './Root.module.css';
import SearchList from '../organisms/SearchList';
import ApiClient from '../utils/ApiClient';
import { AppContext } from '../App';

const RootTemplate = () => {
  // YouTube APIの検索結果を格納するStateを定義
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { searchResult, setSearchResult } = useContext(AppContext);

  const searchList = useCallback(
    debounce(async (q: string) => {
      try {
        // アイコンの表示を初期化
        setIsError(false);
        setIsLoading(true);

        if (q.trim() !== '') {
          const { items } = await ApiClient.search(q);
          setSearchResult({ query: q, items: items! });
        } else {
          // 入力テキストが空なら結果はない
          setSearchResult({ query: '', items: [] });
        }
      } catch (e) {
        setIsError(true);
      } finally {
        // ロードアニメーションを解除しないと結果が帰ってきてもずっとアニメーションが表示されてしまう
        setIsLoading(false);
      }
    }, 500), // 500ms待つ
    []
  );
  return (
    <>
      <SearchBar onChange={searchList} defaultValue={searchResult.query} />
      <div className={styles.content}>
        <SearchList
          isLoading={isLoading}
          isError={isError}
          query={searchResult.query}
          list={searchResult.items}
        />
      </div>
    </>
  );
};

export default RootTemplate;
