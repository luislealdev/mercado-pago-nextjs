// /app/api/checkout/route.ts

import { initMercadoPago, } from "@mercadopago/sdk-react";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

// A fines del tutorial pongo un token de muestra, pero siempre esta información se tiene que manejar
// como variable de entorno en un archivo .env

// app/mock/Producto.ts

export interface IProduct {
    id: number;
    title: string;
    price: number;
    img: string;
    description: string[];
}

export const Product: IProduct = {
    id: 1,
    title: "Notebook",
    price: 2500,
    description: [
        "Pantalla Ultra HD de 15.6 pulgadas con tecnología antirreflejos y resolución de 3840 x 2160.",
        "Procesador Intel Core i9 de última generación con 16 GB de memoria RAM y almacenamiento SSD de 1 TB.",
        "Tarjeta gráfica NVIDIA GeForce RTX 3070 para un rendimiento gráfico excepcional.",
        "Batería de larga duración con hasta 12 horas de uso continuo y sistema de carga rápida.",
        "Teclado retroiluminado con ajuste de intensidad y touchpad de precisión para una experiencia de escritura cómoda.",
        "Sistema de refrigeración avanzado para mantener el rendimiento bajo carga intensiva.",
        "Conectividad completa con WiFi 6, Bluetooth 5.0, puertos USB-C, HDMI y lector de tarjetas SD.",
    ],
    img: "https://noblex.com.ar/media/catalog/product/cache/c8f6a96bef9e9f64cd4973587df2520f/n/1/n15wi3256fhd_05.jpg",
};

// mercadopago.configure({
//     access_token: 'APP_USR-1111111111111111-11111-111111111111111-1111111111',
// });
initMercadoPago('TEST-3e7f60df-e8d4-41a7-b24c-2d9b8d49eb95');
const URL = "http://localhost:3000";

// En "items" se puede usar directamente el producto, a fines de prueba tambien se puede hardcodear y poner valores
// hasta 5 como minimo.


export async function POST(req: NextApiRequest, res: NextApiResponse) {
    try {
        const preference = {
            items: [
                {
                    title: "prueba",
                    unit_price: 10,
                    quantity: 1,
                },
            ],
            auto_return: "approved",
            back_urls: {
                success: `${URL}`,
                failure: `${URL}`,
            },
            notification_url: `${URL}/api/notify`,
        };

        const response = await axios.post('https://api.mercadopago.com/checkout/preferences', preference)

        return res.status(200).send(response.data.id);

    } catch (error) {
        console.error(error);
        return res.status(500).send(error);
    }
}