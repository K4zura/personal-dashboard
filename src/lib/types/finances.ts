export interface Income {
	name: string;
	type: string;
	date: Date;
	amount: number;
	color: string;
}

export interface Expense {
	name: string;
	type: string;
	date: Date;
	amount: number;
	color: string;
	category: Budget;
}

export interface Budget {
	name: string;
	amount: number;
	color: string;
}
