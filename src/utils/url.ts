export const getBaseUrl = () => {
  const environment = process.env.NODE_ENV;

  const baseUrl =
    environment === "development"
      ? "http://localhost:3000"
      : `https://${process.env.BETTER_AUTH_URL}`;

  return baseUrl;
};
