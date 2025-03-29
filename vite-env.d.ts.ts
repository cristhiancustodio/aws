/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_table_dynamo: string;
    readonly VITE_bucket: string;
    readonly VITE_region: string;
    readonly VITE_url_cloudfront: string;
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
  