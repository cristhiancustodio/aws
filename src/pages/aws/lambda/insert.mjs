
/**
 * FORMULARIO PARA REGISTRO DE USUARIO Y SUBIDA DE ARCHIVOS A S3
 *
 */
import { S3Client, PutObjectCommand, ListBucketsCommand, ListObjectsV2Command } from "@aws-sdk/client-s3";
import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";
import { randomUUID } from 'crypto';
import { config } from "./config";

export const handler = async (event) => {

    try {
        const s3 = new S3Client({ region: config.region });
        const client = new DynamoDBClient({ region: config.region });
        const { nombre, apellido, fileContent, fileName, fileType } = JSON.parse(event.body);

        const userId = randomUUID();

        const paramsDB = {
            TableName: config.table_dynamo,
            Item: marshall({
                id: userId,
                nombre: nombre,
                apellido: apellido,
                fileName: fileName,
                fileType: fileType,
                fecha: new Date().toISOString()
            })
        };
        const commandDB = new PutItemCommand(paramsDB);
        const res = await client.send(commandDB);


        let command = new PutObjectCommand({
            Bucket: config.bucket,
            Key: fileName,
            Body: Buffer.from(fileContent, 'base64'),
            ContentType: fileType,
            Metadata: {
                'original-filename': fileName,
                'upload-method': 'base64'
            }
        });
        let resul = await s3.send(command);

        return {
            response_db: res,
            response_s3: resul
        }
    } catch (error) {
        return {
            response: error.message

        };
    }
};