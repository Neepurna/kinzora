export interface MenuItem {
  id: number;
  name: string;
  description?: string;
  price: number;
  unit?: string;
  tag?: 'signature' | 'spicy' | 'veg';
}

export interface MenuCategory {
  id: string;
  label: string;
  items: MenuItem[];
}

export const menuCategories: MenuCategory[] = [
  {
    id: 'entrantes',
    label: 'Entrantes',
    items: [
      { id: 1, name: 'Ensalada de Algas Wakame', price: 5.90 },
      { id: 2, name: 'Gyoza de Pollo', price: 5.90, unit: '4und' },
      { id: 3, name: 'Gyoza de Verdura', price: 5.50, unit: '4und', tag: 'veg' },
      { id: 4, name: 'Edamame', description: 'Salteado con soja, aceite de sésamo y sal maldon', price: 5.90, tag: 'veg' },
      { id: 5, name: 'Rollitos de Pollo', price: 6.90, unit: '4und' },
      { id: 6, name: 'Rollitos de Verdura', price: 5.50, unit: '4und', tag: 'veg' },
      { id: 7, name: 'Takoyaki', description: 'Rellenas de pulpo, salsa aioli, salsa teriyaki y bonito flakes', price: 6.90, unit: '4und' },
      { id: 8, name: 'Langostino de Tempura', description: 'Rebozados de panko y salsa de lux', price: 7.90, unit: '4und' },
      { id: 9, name: 'Karaage', description: 'Pollo frito estilo japonés con salsa miel y mostaza', price: 6.90 },
      { id: 10, name: 'Pan Bao de Pollo', description: 'Cogollos de lechuga con salsa de lux', price: 5.90 },
      { id: 11, name: 'Pan Bao de Langostino Tempura', description: 'Cogollos de lechuga con salsa de lux', price: 5.90 },
      { id: 12, name: 'Pan Bao de Pato de Lux', description: 'Pepino, puerros, salsa pato', price: 6.50 },
      { id: 13, name: 'Tempura de Gambón con Salsa de Lux', description: 'Base de lechuga, cogollos, masago, naranja y cebolleta', price: 11.90 },
    ],
  },
  {
    id: 'tartares',
    label: 'Tartares',
    items: [
      { id: 14, name: 'Salmón Tartare', description: 'Marinado en salsa miel con mostaza, base de aguacate, dados de salmón, mango, masago y cebollino', price: 12.90, tag: 'signature' },
      { id: 15, name: 'Atún Tartare', description: 'Dados de atún marinado en salsa kimchi y ponzu, base de aguacate y wakame, topping llema de huevo codorniz', price: 13.90, tag: 'signature' },
    ],
  },
  {
    id: 'tiradito',
    label: 'Tiradito',
    items: [
      { id: 16, name: 'Ceviches de Lubina Salvaje', description: 'Con leche de tigre', price: 14.90, unit: '8 láminas' },
      { id: 17, name: 'Tiradito de Lubina Salvaje', description: 'Con salsa ponzu y cebolleta chino', price: 8.90, unit: '8 láminas' },
      { id: 18, name: 'Tiradito Salmón', description: 'Salsa maracuyá y cebolleta', price: 9.90, unit: '8 láminas' },
      { id: 19, name: 'Tiradito de Atún', description: 'Salsa trufa y ponzu', price: 10.90, unit: '8 láminas' },
    ],
  },
  {
    id: 'nigiris-classic',
    label: 'Nigiris Classic',
    items: [
      { id: 20, name: 'Salmón', price: 5.50, unit: '2 piezas' },
      { id: 21, name: 'Atún', price: 5.90, unit: '2 piezas' },
      { id: 22, name: 'Pez Mantequilla', price: 5.50, unit: '2 piezas' },
      { id: 23, name: 'Ebi (Gamba)', price: 5.50, unit: '2 piezas' },
      { id: 24, name: 'Angila', price: 5.50, unit: '2 piezas' },
    ],
  },
  {
    id: 'nigiris-especial',
    label: 'Nigiris Especial',
    items: [
      { id: 25, name: 'Salmón Flambeado', description: 'Salsa gold y cebollino', price: 5.90, unit: '2 piezas', tag: 'signature' },
      { id: 26, name: 'Pez Mantequilla con Trufa', description: 'Sal maldon', price: 6.50, unit: '2 piezas', tag: 'signature' },
      { id: 27, name: 'Angila', description: 'Salsa angila y cebolla frito', price: 5.90, unit: '2 piezas' },
      { id: 28, name: 'Lubina', description: 'Con ponzu, cebolleta y sal maldon', price: 5.90, unit: '2 piezas' },
      { id: 29, name: 'Ebi', description: 'Salsa mayo japo masago negro', price: 5.90, unit: '2 piezas' },
    ],
  },
  {
    id: 'sashimis',
    label: 'Sashimis',
    items: [
      { id: 30, name: 'Salmón', price: 10.90, unit: '6 piezas' },
      { id: 31, name: 'Atún', price: 12.90, unit: '6 piezas' },
      { id: 32, name: 'Pez Mantequilla', price: 11.90, unit: '6 piezas' },
      { id: 33, name: 'Sashimi Variado', description: 'Salmón 3pz · Atún 3pz · Pez Mantequilla 3pz', price: 14.90, unit: '9 piezas' },
    ],
  },
  {
    id: 'classic-uramaki',
    label: 'Classic Rolls',
    items: [
      { id: 34, name: 'Salmón Roll', description: 'Aguacate · salmón · pepino', price: 9.90, unit: '8 piezas' },
      { id: 35, name: 'Atún Roll', description: 'Aguacate · atún · queso philadelphia', price: 10.50, unit: '8 piezas' },
      { id: 36, name: 'Salmón Creamy Roll', description: 'Aguacate · salmón · queso philadelphia, salsa teriyaki, cebolla frito', price: 10.50, unit: '8 piezas' },
      { id: 37, name: 'California Roll', description: 'Aguacate · pepino · kanikama, masago naranja', price: 9.90, unit: '8 piezas' },
      { id: 38, name: 'Crujiente Tempura Roll', description: 'Langostino tempura · aguacate, salsa angila y cebolla frito', price: 9.90, unit: '8 piezas' },
      { id: 39, name: 'Spicy Tuna Roll', description: 'Marinados salsa mayo picante y cebollino', price: 10.90, unit: '8 piezas', tag: 'spicy' },
      { id: 40, name: 'Atún Trufa Roll', description: 'Esparragos · pepino · atún, salsa trufa y mayo japo, cebollino', price: 10.90, unit: '8 piezas' },
      { id: 41, name: 'Salmón Mango Roll', description: 'Mango · salmón · queso philadelphia, salsa miel con mostaza', price: 10.90, unit: '8 piezas' },
      { id: 42, name: 'Salmón Happy Roll', description: 'Langostino tempura · salmón · salsa maracuya', price: 11.90, unit: '8 piezas' },
    ],
  },
  {
    id: 'kinzora-specials',
    label: 'Kinzora Specials',
    items: [
      { id: 43, name: 'Salmón Braseado Roll', description: 'Aguacate · salmón · queso philadelphia, cubierto de salmón con salsa gold', price: 12.90, unit: '8 piezas', tag: 'signature' },
      { id: 44, name: 'Dragon Crunchy Roll', description: 'Langostino tempura · queso philadelphia, cubierto de aguacate y salsa teriyaki, cebolla frito', price: 10.90, unit: '8 piezas', tag: 'signature' },
      { id: 45, name: 'Atún Topping Roll', description: 'Aguacate · ebi · queso philadelphia, cubierto de atún flambeado, salsa angila y zanahoria frito', price: 12.90, unit: '8 piezas', tag: 'signature' },
      { id: 46, name: 'Especial Fotomaki', description: 'Langostino tempura · salmón · aguacate, masago naranja · pepino, salsa teriyaki', price: 13.90, unit: '8 piezas' },
      { id: 47, name: 'Loco Roll', description: 'Rebozado de pez mantequilla · aguacate, cubierto de salmón flambeado con salsa gold e ikura', price: 12.90, unit: '8 piezas' },
      { id: 48, name: 'De Lux Veg Roll', description: 'Aguacate · pepino · esparragos, salsa miel con mostaza', price: 9.90, unit: '8 piezas', tag: 'veg' },
      { id: 49, name: 'Rainbow Roll', description: 'Esparragos · aguacate · ebi, queso philadelphia, cubierto de salmón, atún y pez mantequilla con salsa angila arare', price: 12.90, unit: '8 piezas', tag: 'signature' },
      { id: 50, name: 'Kinzora Pink Roll', description: 'Aguacate · esparragos · pepino, tinta de remolacha, salsa mayo japo, teriyaki y arare', price: 10.90, unit: '8 piezas' },
      { id: 51, name: 'Tinta de Calamar Salmón Roll', description: 'Salmón · aguacate y toque de mayo japo', price: 12.90, unit: '8 piezas' },
      { id: 52, name: 'Pollo Crunchy Roll', description: 'Pechuga de pollo tempurizado con panko, aguacate · queso philadelphia, salsa cesar y cebolla fritos', price: 9.90, unit: '8 piezas' },
      { id: 53, name: 'Delux Roll', description: 'Aguacate · salmón, cubierto de pez mantequilla flambeado con salsa angila y jalapeños', price: 12.90, unit: '8 piezas', tag: 'signature' },
      { id: 54, name: 'Salmón Picante Roll', description: 'Pepino · esparragos, shichimi, salmón marinado con salsa kimchi y cebolleta', price: 12.90, unit: '8 piezas', tag: 'spicy' },
      { id: 55, name: 'Angila Topping Roll', description: 'Aguacate · pepino · queso philadelphia, salsa angila', price: 12.90, unit: '8 piezas' },
    ],
  },
  {
    id: 'poke-bowls',
    label: 'Poke Bowls',
    items: [
      { id: 56, name: 'Salmón Poke Bowl', description: 'Arroz de sushi, salmón, aguacate, edamame, masago, salsa ponzu', price: 14.90 },
      { id: 57, name: 'Atún Poke Bowl', description: 'Arroz de sushi, atún, pepino, algas wakame, cebollino, salsa kimchi', price: 15.90 },
      { id: 58, name: 'Mixto Poke Bowl', description: 'Arroz de sushi, salmón y atún, aguacate, edamame, masago, salsa gold', price: 16.90, tag: 'signature' },
    ],
  },
  {
    id: 'makis',
    label: 'Makis',
    items: [
      { id: 59, name: 'Maki de Salmón', description: 'Salmón · pepino', price: 6.90, unit: '6 piezas' },
      { id: 60, name: 'Maki de Atún', description: 'Atún · pepino', price: 7.50, unit: '6 piezas' },
      { id: 61, name: 'Maki de Aguacate', description: 'Aguacate · pepino', price: 5.90, unit: '6 piezas', tag: 'veg' },
    ],
  },
  {
    id: 'temaki',
    label: 'Temaki',
    items: [
      { id: 62, name: 'Temaki Salmón', description: 'Salmón, aguacate, queso philadelphia', price: 7.90 },
      { id: 63, name: 'Temaki Atún', description: 'Atún, aguacate, masago', price: 8.90 },
      { id: 64, name: 'Temaki Spicy', description: 'Salmón, salsa kimchi, aguacate, cebollino', price: 8.90, tag: 'spicy' },
    ],
  },
  {
    id: 'desserts',
    label: 'Postres',
    items: [
      { id: 65, name: 'Mochi de Vainilla', description: 'Helado de vainilla envuelto en mochi de arroz', price: 4.90 },
      { id: 66, name: 'Mochi de Matcha', description: 'Helado de matcha envuelto en mochi de arroz', price: 4.90 },
      { id: 67, name: 'Coulant de Matcha', description: 'Con helado de vainilla', price: 6.90 },
    ],
  },
  {
    id: 'beverages',
    label: 'Bebidas',
    items: [
      { id: 68, name: 'Agua Mineral', price: 2.50 },
      { id: 69, name: 'Cerveza Japonesa', description: 'Asahi / Sapporo', price: 4.50 },
      { id: 70, name: 'Sake', description: 'Caliente o frío', price: 5.90 },
      { id: 71, name: 'Vino de la Casa', description: 'Tinto o blanco', price: 3.90, unit: 'copa' },
      { id: 72, name: 'Refresco', description: 'Coca-Cola · Agua con gas · Limonada', price: 2.90 },
    ],
  },
];

export const signatureItems = [
  {
    number: '01',
    name: 'Salmón Flambeado',
    description: 'Nigiri de salmón flambeado al momento con salsa gold y cebollino fresco',
    price: '5,90€',
    accent: 'from-orange-900/40 to-orange-600/10',
    border: 'border-orange-500/20',
  },
  {
    number: '02',
    name: 'Dragon Crunchy Roll',
    description: 'Langostino tempura, queso philadelphia, cubierto de aguacate y salsa teriyaki con cebolla frito',
    price: '10,90€',
    accent: 'from-emerald-900/40 to-emerald-600/10',
    border: 'border-emerald-500/20',
  },
  {
    number: '03',
    name: 'Rainbow Roll',
    description: 'Esparragos, aguacate, ebi y queso philadelphia, cubierto de salmón, atún y pez mantequilla',
    price: '12,90€',
    accent: 'from-rose-900/40 to-rose-600/10',
    border: 'border-rose-500/20',
  },
  {
    number: '04',
    name: 'Delux Roll',
    description: 'Aguacate y salmón cubierto de pez mantequilla flambeado con salsa angila y jalapeños',
    price: '12,90€',
    accent: 'from-yellow-900/40 to-yellow-600/10',
    border: 'border-yellow-500/20',
  },
];
