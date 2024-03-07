import { ThemeProvider } from 'styled-components';
import GlobalStyle from '@/styles/Globalstyle';
import * as S from '@/styles/Contentstyle';
import { Routes, Route } from 'react-router-dom';

import Home from '@/pages/Home/Home';
import theme from '@/styles/theme';

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <S.Content>
          <S.Wrap>
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </S.Wrap>
        </S.Content>
      </ThemeProvider>
    </>
  );
}

export default App;
