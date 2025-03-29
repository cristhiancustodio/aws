

export const config = {
    table_dynamo: import.meta.env.VITE_table_dynamo,
    bucket: import.meta.env.VITE_bucket,
    region: import.meta.env.VITE_region,
    url_cloudfront: import.meta.env.VITE_url_cloudfront,
    api: import.meta.env.VITE_api,
}