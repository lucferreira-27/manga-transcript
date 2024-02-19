import BasePage from './components/BasePage/BasePage';
import ImageRender from './components/Pages/ImageRender/ImageRender';
import UserConfiguration from './components/UserConfiguration/UserConfiguration';
import { ConfigProvider } from './context/ConfigContext'; // Adjusted import
import "./index.css";
import {Pages} from './components/Pages/Pages';

function App() {
  return (
    <ConfigProvider>
      <BasePage title="Magi">
        <UserConfiguration/>
        <Pages/>  
      </BasePage>
    </ConfigProvider>
  );
}

export default App;