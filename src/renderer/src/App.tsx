import BasePage from './components/BasePage/BasePage';
import UserConfiguration from './components/UserConfiguration/UserConfiguration';
import { ConfigProvider } from './context/ConfigContext'; // Adjusted import
import { ThemeProvider } from '@mui/material';
import "./index.css";
import { Pages } from './components/Pages/Pages';
import theme from './themes/MainTheme'; // Import the theme

function App() {
  return (
    <ThemeProvider theme={theme}>
      <ConfigProvider>
        <BasePage title="Magi">
          <UserConfiguration />
          <Pages />
        </BasePage>
      </ConfigProvider>
    </ThemeProvider>
  );
}

export default App;