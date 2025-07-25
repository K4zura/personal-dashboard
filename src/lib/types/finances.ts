export interface Income {
	id: string;
	name: string;
	type: string;
	date: Date;
	amount: number;
	color: string;
}

export interface Expense {
	id: string;
	name: string;
	type: string;
	date: Date;
	amount: number;
	color: string;
	category: Budget;
}

export interface Budget {
	id: string;
	name: string;
	color: string;
	limit: number;
	expense: Expense[];
}

export interface Goal {
	id: string;
	name: string;
	color: string;
	total: number;
	saved: number;
	monthly: number;
	deadline: string;
}
