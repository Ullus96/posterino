export interface ITimeSlot {
	uuid: string;
	hours?: number;
	minutes?: number;
}

export interface ISingleFilm {
	timeSlots: ITimeSlot[];
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
