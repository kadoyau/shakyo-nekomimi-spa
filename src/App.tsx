import React, {lazy,Suspense, useState} from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import 'lazysizes'


const LazyRootPage = lazy(()=> import('./pages/Root'));
const LazyWatchPage = lazy(()=> import('./pages/Watch'));
const LazyNoMatchPage = lazy(()=> import('./pages/NoMatch'));

interface SearchResult {
  query: string;
  items: gapi.client.youtube.SearchResult[];
}

// 初期値をnullにしたいため、anyとしている（実際の値はnullにならない）
export const AppContext: React.Context<{
  searchResult: SearchResult;
  setSearchResult: React.Dispatch<React.SetStateAction<SearchResult>>;
}> = React.createContext<any>(null);

const App: React.FC = () => {
  const [searchResult, setSearchResult] = useState<SearchResult>({
    query: '',
    items: []
  });

  return (
    <BrowserRouter>
      <AppContext.Provider value={{ searchResult, setSearchResult }}>
        <Suspense fallback={<div>loading...</div>}>
        <Switch>
          <Route exact path="/" component={LazyRootPage} />
          <Route path="/watch/:id" component={LazyWatchPage} />
          <Route component={LazyNoMatchPage} />
        </Switch>
        </Suspense>
      </AppContext.Provider>
    </BrowserRouter>
  );
};

export default App;
