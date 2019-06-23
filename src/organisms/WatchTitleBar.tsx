import React from 'react';
import { AppBar } from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

interface Props {
  title: string;
}

// 動画タイトルを表示するコンポーネント
const WatchTitleBar = (props: Props) => {
  const { title } = props;
  return (
    <AppBar position="fixed">
      <Toolbar variant="dense">
        <Typography variant="h6" color="inherit" noWrap>
          {title}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default WatchTitleBar;
