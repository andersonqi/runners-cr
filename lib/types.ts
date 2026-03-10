export type Ruta = "10km" | "6km" | "3.5km" | "kids";
export type Genero = "masculino" | "femenino";
export type Talla = "XS" | "S" | "M" | "L" | "XL" | "XXL";

export interface Participant {
  nombre: string;
  apellidos: string;
  genero: Genero;
  fecha_nacimiento: string;
  cedula: string;
  telefono: string;
  talla_camiseta: Talla;
  ruta: Ruta;
}

export interface Order {
  id: string;
  order_number: string;
  total_amount: number;
  payment_proof_url: string | null;
  status: "pendiente" | "confirmado" | "rechazado";
  created_at: string;
}

export interface Registration extends Participant {
  id: string;
  order_id: string;
  created_at: string;
}

export const RUTAS = [
  {
    id: "10km" as Ruta,
    nombre: "10 KM - Ruta Larga",
    precio: 15000,
    premios: [
      { lugar: "1er Lugar", monto: "₡100,000" },
      { lugar: "2do Lugar", monto: "₡50,000" },
      { lugar: "3er Lugar", monto: "₡25,000" },
    ],
    genero: true,
  },
  {
    id: "6km" as Ruta,
    nombre: "6 KM - Ruta Corta",
    precio: 15000,
    premios: [
      { lugar: "1er Lugar", monto: "₡50,000" },
      { lugar: "2do Lugar", monto: "₡30,000" },
      { lugar: "3er Lugar", monto: "₡20,000" },
    ],
    genero: true,
  },
  {
    id: "3.5km" as Ruta,
    nombre: "3.5 KM - Caminata",
    precio: 10000,
    premios: [],
    genero: false,
  },
  {
    id: "kids" as Ruta,
    nombre: "Kids Run",
    precio: 10000,
    premios: [],
    genero: false,
  },
];

export const TALLAS: Talla[] = ["XS", "S", "M", "L", "XL", "XXL"];

export function getPrecioByRuta(ruta: Ruta): number {
  return RUTAS.find((r) => r.id === ruta)?.precio ?? 0;
}

export function getRutaLabel(ruta: Ruta): string {
  return RUTAS.find((r) => r.id === ruta)?.nombre ?? ruta;
}

export function formatColones(amount: number): string {
  return `₡${amount.toLocaleString("es-CR")}`;
}
