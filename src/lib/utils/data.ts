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
	title: string;
	frequency: string;
	category: Category;
	date: Date;
	mount: number;
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
		title: 'Almuerzo restaurante',
		category: expenseCategories[0],
		date: new Date('2024-12-05'),
		mount: 45,
		frequency: '📅 Semanal'
	},
	{
		title: 'Comida rápida',
		category: expenseCategories[0],
		date: new Date('2025-01-10'),
		mount: 32,
		frequency: '🔁 Diario'
	},
	{
		title: 'Suscripción Netflix',
		category: expenseCategories[1],
		date: new Date('2025-02-01'),
		mount: 38,
		frequency: '🗓️ Mensual'
	},
	{
		title: 'Compra videojuego',
		category: expenseCategories[1],
		date: new Date('2025-03-18'),
		mount: 60,
		frequency: '🎯 Ocasional'
	},
	{
		title: 'Recarga gasolina',
		category: expenseCategories[2],
		date: new Date('2024-11-03'),
		mount: 80,
		frequency: '📅 Semanal'
	},
	{
		title: 'Transporte público',
		category: expenseCategories[2],
		date: new Date('2025-02-08'),
		mount: 25,
		frequency: '🔁 Diario'
	},
	{
		title: 'Uber ida al trabajo',
		category: expenseCategories[2],
		date: new Date('2025-04-16'),
		mount: 40,
		frequency: '🎯 Ocasional'
	},
	{
		title: 'Compra camiseta',
		category: expenseCategories[3],
		date: new Date('2024-10-12'),
		mount: 50,
		frequency: '🗓️ Mensual'
	},
	{
		title: 'Zapatos deportivos',
		category: expenseCategories[3],
		date: new Date('2025-01-20'),
		mount: 120,
		frequency: '🎯 Ocasional'
	},
	{
		title: 'Pago energía',
		category: expenseCategories[4],
		date: new Date('2024-12-07'),
		mount: 70,
		frequency: '🗓️ Mensual'
	},
	{
		title: 'Pago agua',
		category: expenseCategories[4],
		date: new Date('2025-03-15'),
		mount: 60,
		frequency: '🗓️ Mensual'
	},
	{
		title: 'Internet hogar',
		category: expenseCategories[4],
		date: new Date('2025-02-02'),
		mount: 55,
		frequency: '🗓️ Mensual'
	},
	{
		title: 'Café y panadería',
		category: expenseCategories[0],
		date: new Date('2025-01-11'),
		mount: 18,
		frequency: '🔁 Diario'
	},
	{
		title: 'Salida al cine',
		category: expenseCategories[1],
		date: new Date('2025-05-22'),
		mount: 30,
		frequency: '🎯 Ocasional'
	}
];
