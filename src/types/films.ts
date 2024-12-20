export interface ISingleFilm {
	timeSlots: Array<[number?, number?]>;
	title: string;
	meta?: {
		age?: number | null;
		pCard?: boolean | null;
	};
	price: number;
	uuid: string;
}

export interface IDaySchedule {
	date: moment.Moment;
	isWorkingDay: boolean;
	films: Array<ISingleFilm>;
}
