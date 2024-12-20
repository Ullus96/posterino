export interface ISingleFilm {
	time: Array<[number?, number?]>;
	title: string;
	meta?: {
		age?: number;
		pCard?: boolean;
	};
	price: number;
}

export interface IDaySchedule {
	date: moment.Moment;
	isWorkingDay: boolean;
	films: Array<Partial<ISingleFilm>>;
}
