import React, { createContext, useContext, useState } from 'react';

type Config = {
  paths: {
    volumesPath: string;
    annotationsPath: string;
  };
};

const defaultConfig: Config = {
  paths: {
    volumesPath: "E:\\One Piece Transcription\\volumes",
    annotationsPath: "E:\\One Piece Transcription\\annotations",
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