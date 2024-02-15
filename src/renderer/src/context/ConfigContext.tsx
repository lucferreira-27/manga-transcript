import React, { createContext, useContext, useState } from 'react';

const defaultConfig = {
  paths: {
    imagePath: "",
  },
};

const ConfigContext = createContext({
  config: defaultConfig,
  setConfig: (config: typeof defaultConfig) => {},
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