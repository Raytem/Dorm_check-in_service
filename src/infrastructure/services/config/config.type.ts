export interface Config {
  app: {
    title: string;
    baseUrl: string;
    loginRedirectUrl: string;
    logoutRedirectUrl: string;
  };
  authServer: {
    baseUrl: string;
    loginUrl: string;
    logoutUrl: string;
    forbiddenUrl: string;
    api: {
      baseUrl: string;
    };
  };
  backendApi: {
    baseUrl: string;
  };
}
