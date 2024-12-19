export interface ISingleFilm {
	time: Array<[number, number]>;
	title: string;
	meta: {
		age: number;
		pCard: boolean;
	};
	price: number;
}

export type Films = Array<ISingleFilm>;
