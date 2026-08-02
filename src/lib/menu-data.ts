export type MenuItem = {
  id: string;
  nome: string;
  descricao: string;
  preco: number;
  categoria: string;
};

export const CATEGORIAS = ["Bolos no Pote", "Sobremesas", "Bebidas"] as const;

export const MENU: MenuItem[] = [
  {
    id: "ninho-nutella",
    nome: "Ninho com Nutella",
    descricao: "Camadas de creme de leite ninho e nutella cremosa",
    preco: 18,
    categoria: "Bolos no Pote",
  },
  {
    id: "prestigio",
    nome: "Prestígio",
    descricao: "Massa de chocolate com recheio de coco cremoso",
    preco: 16,
    categoria: "Bolos no Pote",
  },
  {
    id: "morango-ninho",
    nome: "Morango com Ninho",
    descricao: "Morangos frescos e creme de leite ninho",
    preco: 18,
    categoria: "Bolos no Pote",
  },
  {
    id: "brigadeiro",
    nome: "Brigadeiro Gourmet",
    descricao: "Chocolate meio amargo com granulado belga",
    preco: 15,
    categoria: "Bolos no Pote",
  },
  {
    id: "abacaxi",
    nome: "Abacaxi com Creme",
    descricao: "Abacaxi caramelizado com creme de baunilha",
    preco: 16,
    categoria: "Bolos no Pote",
  },
  {
    id: "pave",
    nome: "Pavê de Chocolate",
    descricao: "Bolacha, creme e chocolate na medida certa",
    preco: 17,
    categoria: "Sobremesas",
  },
  {
    id: "pudim",
    nome: "Pudim no Pote",
    descricao: "Pudim cremoso com calda de caramelo",
    preco: 14,
    categoria: "Sobremesas",
  },
  {
    id: "mousse-maracuja",
    nome: "Mousse de Maracujá",
    descricao: "Mousse aerado com calda de maracujá natural",
    preco: 14,
    categoria: "Sobremesas",
  },
  {
    id: "refri-lata",
    nome: "Refrigerante Lata",
    descricao: "Coca-Cola, Guaraná ou Fanta 350ml",
    preco: 6,
    categoria: "Bebidas",
  },
  {
    id: "suco",
    nome: "Suco Natural 500ml",
    descricao: "Laranja, maracujá ou limonada suíça",
    preco: 9,
    categoria: "Bebidas",
  },
];

// Número do WhatsApp da loja (formato internacional, só dígitos)
export const WHATSAPP_NUMERO = "5511999999999";

export const brl = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
