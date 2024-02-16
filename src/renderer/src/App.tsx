import BasePage from './components/BasePage/BasePage';
import ImageRender from './components/Pages/ImageRender/ImageRender';
import UserConfiguration from './components/UserConfiguration/UserConfiguration';
import { ConfigProvider } from './context/ConfigContext'; // Adjusted import
import "./index.css";

function App() {
  return (
    <ConfigProvider>
      <BasePage title="Magi">
        <UserConfiguration/>
        <ImageRender src={"https://cdn.onepiecechapters.com/file/CDN-M-A-N/one_1096_003.png"} alt="React logo" />
      </BasePage>
    </ConfigProvider>
  );
}

export default App;