import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router';

import { type FC } from 'react';

import store from '@/store';
import { FavoritesPage } from '@/pages/FavoritesPage';
import { AppRoutes } from '@/constants/paths';
import { MainPage } from '@/pages/MainPage';

const App: FC = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path={AppRoutes.MAIN} element={<MainPage />} />
          <Route path={AppRoutes.FAVORITES} element={<FavoritesPage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
