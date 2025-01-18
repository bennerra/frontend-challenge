import { BrowserRouter } from 'react-router';

import { type FC } from 'react';

import { Header } from '@/components/Header';

const App: FC = () => {
  return (
    <BrowserRouter>
      <div>
        <Header />
      </div>
    </BrowserRouter>
  );
};

export default App;
