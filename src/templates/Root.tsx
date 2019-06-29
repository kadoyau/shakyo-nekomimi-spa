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
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const searchList = useCallback(
    debounce(async (q: string) => {
        try {
            // アイコンの表示を初期化
            setIsError(false);
            setIsLoading(true);

            if (q.trim() !== '') {
                const {items} = await ApiClient.search(q);
                setQuery(q);
                setList(items!);
            } else {
                // 入力テキストが空なら結果はない
                setList([]);
            }
        } catch (e) {
            setIsError(true);
        }finally {
            // ロードアニメーションを解除しないと結果が帰ってきてもずっとアニメーションが表示されてしまう
            setIsLoading(false);
        }
    }, 500), // 500ms待つ
    []
  );
  return (
    <>
      <SearchBar onChange={searchList} />
      <div className={styles.content}>
        <SearchList isLoading={isLoading} isError={isError} query={query} list={list} />
      </div>
    </>
  );
};

export default RootTemplate;
