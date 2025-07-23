// incomeData.ts
export interface Category {
	icon: string;
	name: string;
	color: string;
	budget?: number;
}

export const incomeCategories: Category[] = [
	{
		icon: '💻',
		name: 'Freelance',
		color: 'green'
	},
	{
		icon: '🏪',
		name: 'Negocio',
		color: 'red'
	},
	{
		icon: '📈',
		name: 'Inversiones',
		color: 'purple'
	},
	{
		icon: '💼',
		name: 'Trabajo',
		color: 'blue'
	}
];

// export interface Income {
// 	name: string;
// 	category: Category;
// 	type: string;
// 	date: Date;
// 	mount: number;
// 	color: string;
// }

// export const incomeData: Income[] = [
// 	{
// 		title: 'Consultoria',
// 		category: incomeCategories[0],
// 		type: 'Variable',
// 		date: new Date('2025-01-14'),
// 		mount: 300,
// 		color: '#47ff7f'
// 	},
// 	{
// 		title: 'Venta de camisetas',
// 		category: incomeCategories[1], // Negocio
// 		type: 'Variable',
// 		date: new Date('2025-01-20'),
// 		mount: 150,
// 		color: '#ff477f'
// 	},
// 	{
// 		title: 'Dividendos ETF',
// 		category: incomeCategories[2], // Inversiones
// 		type: 'Fixed',
// 		date: new Date('2025-02-01'),
// 		mount: 120,
// 		color: '#7f47ff'
// 	},
// 	{
// 		title: 'Sueldo mensual',
// 		category: incomeCategories[3], // Trabajo
// 		type: 'Fixed',
// 		date: new Date('2025-02-28'),
// 		mount: 400,
// 		color: '#477fff'
// 	},
// 	{
// 		title: 'Proyecto diseño web',
// 		category: incomeCategories[0], // Freelance
// 		type: 'Variable',
// 		date: new Date('2024-03-12'),
// 		mount: 500,
// 		color: '#7fff47'
// 	},
// 	{
// 		title: 'Ventas tienda online',
// 		category: incomeCategories[1], // Negocio
// 		type: 'Variable',
// 		date: new Date('2024-03-25'),
// 		mount: 350,
// 		color: '#ff7fff'
// 	},
// 	{
// 		title: 'Acciones Apple',
// 		category: incomeCategories[2], // Inversiones
// 		type: 'Fixed',
// 		date: new Date('2024-04-10'),
// 		mount: 200,
// 		color: '#2f2f3d'
// 	},
// 	{
// 		title: 'Sueldo mensual',
// 		category: incomeCategories[3], // Trabajo
// 		type: 'Fixed',
// 		date: new Date('2024-04-30'),
// 		mount: 1250,
// 		color: '#ff7f47'
// 	}
// ];

export interface Expense {
	name: string;
	frequency: string;
	category: Category;
	date: Date;
	amount: number;
	type?: string;
}

export const expenseCategories: Category[] = [
	{
		icon: '🍽️',
		name: 'Alimentacion',
		color: 'green',
		budget: 300
	},
	{
		icon: '🎮',
		name: 'Entretenimiento',
		color: 'red',
		budget: 150
	},
	{
		icon: '🚗',
		name: 'Transporte',
		color: 'purple',
		budget: 200
	},
	{
		icon: '👕',
		name: 'Vestimenta',
		color: 'blue',
		budget: 180
	},
	{
		icon: '⚡',
		name: 'Servicios',
		color: 'yellow',
		budget: 250
	}
];

export const expenseData: Expense[] = [
	{
		name: 'Almuerzo restaurante',
		category: expenseCategories[0],
		date: new Date('2024-12-05'),
		amount: 45,
		frequency: '📅 Semanal'
	},
	{
		name: 'Comida rápida',
		category: expenseCategories[0],
		date: new Date('2025-01-10'),
		amount: 32,
		frequency: '🔁 Diario'
	},
	{
		name: 'Suscripción Netflix',
		category: expenseCategories[1],
		date: new Date('2025-02-01'),
		amount: 38,
		frequency: '🗓️ Mensual'
	},
	{
		name: 'Compra videojuego',
		category: expenseCategories[1],
		date: new Date('2025-03-18'),
		amount: 60,
		frequency: '🎯 Ocasional'
	},
	{
		name: 'Recarga gasolina',
		category: expenseCategories[2],
		date: new Date('2024-11-03'),
		amount: 80,
		frequency: '📅 Semanal'
	},
	{
		name: 'Transporte público',
		category: expenseCategories[2],
		date: new Date('2025-02-08'),
		amount: 25,
		frequency: '🔁 Diario'
	},
	{
		name: 'Uber ida al trabajo',
		category: expenseCategories[2],
		date: new Date('2025-04-16'),
		amount: 40,
		frequency: '🎯 Ocasional'
	},
	{
		name: 'Compra camiseta',
		category: expenseCategories[3],
		date: new Date('2024-10-12'),
		amount: 50,
		frequency: '🗓️ Mensual'
	},
	{
		name: 'Zapatos deportivos',
		category: expenseCategories[3],
		date: new Date('2025-01-20'),
		amount: 120,
		frequency: '🎯 Ocasional'
	},
	{
		name: 'Pago energía',
		category: expenseCategories[4],
		date: new Date('2024-12-07'),
		amount: 70,
		frequency: '🗓️ Mensual'
	},
	{
		name: 'Pago agua',
		category: expenseCategories[4],
		date: new Date('2025-03-15'),
		amount: 60,
		frequency: '🗓️ Mensual'
	},
	{
		name: 'Internet hogar',
		category: expenseCategories[4],
		date: new Date('2025-02-02'),
		amount: 55,
		frequency: '🗓️ Mensual'
	},
	{
		name: 'Café y panadería',
		category: expenseCategories[0],
		date: new Date('2025-01-11'),
		amount: 18,
		frequency: '🔁 Diario'
	},
	{
		name: 'Salida al cine',
		category: expenseCategories[1],
		date: new Date('2025-05-22'),
		amount: 30,
		frequency: '🎯 Ocasional'
	}
];
