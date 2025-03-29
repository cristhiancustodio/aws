import { S3Client, DeleteObjectCommand, PutObjectCommand, ListBucketsCommand, ListObjectsV2Command } from "@aws-sdk/client-s3";
import { DynamoDBClient, PutItemCommand, ScanCommand } from "@aws-sdk/client-dynamodb";
import { DeleteCommand, GetCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import { config } from "./config";

export const handler = async (event) => {
    const client = new DynamoDBClient({ region: config.region });
    const docClient = DynamoDBDocumentClient.from(client);

    try {

        const { id } = event.pathParameters || {};

        // Parámetros para eliminar el elemento de DynamoDB
        const params = {
            TableName: config.table_dynamo, // Reemplázalo con el nombre de tu tabla
            Key: { id },
        };

        // Primero buscar el registro
        const registro = await buscarRegistro(id);

        // Si existe el registro, eliminar archivo asociado si tiene filename
        if (registro && registro.fileName) {
            await eliminarArchivo(registro.fileName);
        }

        // Ahora eliminar el registro de DynamoDB
        let res = await docClient.send(new DeleteCommand(params));

        return {
            error: false,
            data: res,
            response: "Elemento eliminado correctamente"
        };
    } catch (error) {
        return {
            error: true,
            data: null,
            response: error.message
        };
    }
};

async function eliminarArchivo(filename) {
    try {
        const s3 = new S3Client({ region: config.region });
        const params = {
            Bucket: 'interacciones-cc',
            Key: filename,
        };
        let res = await s3.send(new DeleteObjectCommand(params));
        return {
            error: false,
            data: res,
            response: "Archivo eliminado correctamente"
        };
    } catch (error) {
        return {
            error: true,
            data: null,
            response: error.message
        };
    }
}

async function buscarRegistro(id) {
    const client = new DynamoDBClient({ region: config.region });
    const docClient = DynamoDBDocumentClient.from(client);

    const params = {
        TableName: config.table_dynamo,
        Key: { id },
    };

    try {
        const { Item } = await docClient.send(new GetCommand(params));
        return Item;
    } catch (error) {
        console.error("Error buscando registro:", error);
        return null;
    }
}