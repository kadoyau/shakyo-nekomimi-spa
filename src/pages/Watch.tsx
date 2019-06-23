import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import WatchTemplate from '../templates/Watch';
import ApiClient from '../utils/ApiClient';

// watchページのpahは/watch/:idなのでidが渡される
type Props = RouteComponentProps<{ id: string }>;

export interface WatchData {
  snippet: gapi.client.youtube.VideoSnippet;
  player: gapi.client.youtube.VideoPlayer;
}

const WatchPage = (props: Props) => {
  const { match } = props;
  const [data, setData] = useState<WatchData | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      const { items } = await ApiClient.videos(match.params.id);
      if (items!.length > 0) {
        const item = items![0];
        setData({
          snippet: item.snippet!,
          player: item.player!
        });
      }
    };
    fetchData();
  }, [match.params.id]);

  // fetchDataでデータの取得がされないならレンダリングしない
  if (data === null) {
    return null;
  }
  return <WatchTemplate snippet={data.snippet} player={data.player} />;
};

export default WatchPage;
