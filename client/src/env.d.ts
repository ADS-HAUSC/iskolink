declare interface Env {
  readonly NODE_ENV: string;
  NG_APP_API_BASE_URL: any;
}

declare interface ImportMeta {
  readonly env: Env;
}