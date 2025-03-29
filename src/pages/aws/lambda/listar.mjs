
/**
 * FORMULARIO PARA REGISTRO DE USUARIO Y SUBIDA DE ARCHIVOS A S3
 *
 */
import { S3Client, PutObjectCommand, ListBucketsCommand, ListObjectsV2Command } from "@aws-sdk/client-s3";

import { DynamoDBClient, PutItemCommand, ScanCommand } from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import { config } from "./config";

export const handler = async (event) => {

    try {
        const dynamoDBClient = new DynamoDBClient({ region: config.region });
        const params = {
            TableName: config.table_dynamo,
            // Opcional: limitar el numero de items
            Limit: 100
        };

        // Comando Scan para listar todos los elementos
        const command = new ScanCommand(params);

        // Ejecutar el escaneo
        const response = await dynamoDBClient.send(command);

        // Convertir los items de formato DynamoDB a objetos JavaScript
        const items = response.Items.map(item => {
            const masha = unmarshall(item);
            masha.link = config.url_cloudfront + masha.fileName;
            return masha;
        });

        return {
            error: false,
            data: items
        }
    } catch (error) {
        return {
            error: true,
            data: [],
            response: error.message

        };
    }
};