const getConfig = () => {
  const config = {
    port: process.env.NODE_PORT || 3001
  };
  return config;
}

export default getConfig;