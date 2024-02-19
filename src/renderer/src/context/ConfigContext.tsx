import React, { createContext, useContext, useState } from 'react';

type Config = {
  paths: {
    imagePath: string;
    annotationPath: string;
  };
};

const defaultConfig: Config = {
  paths: {
    imagePath: "E:/Torrent/One Piece v001-100 (2003-2022) (Digital HD) (AnHeroGold-Empire, aKraa, & jxc3764)/Volumes/One Piece v001 (2003) (Digital HD) (AnHeroGold-Empire)",
    annotationPath: "E:/One Piece Volumes Predictions",
  },
};

const ConfigContext = createContext({
  config: defaultConfig as Config,
  setConfig: (config: Config) => {},
});

export const ConfigProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [config, setConfig] = useState(defaultConfig);

  return (
    <ConfigContext.Provider value={{ config, setConfig }}>
      {children}
    </ConfigContext.Provider>
  );
};

export const useConfig = () => useContext(ConfigContext);

export default ConfigContext;