const basePath = process.env.REACT_APP_BASE_PATH;
const apiKey = process.env.REACT_APP_API_KEY;

export const getApiKey = () => {
  return apiKey;
}

export const getBasePath = () => {
  return basePath;
};