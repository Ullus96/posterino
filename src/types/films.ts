export interface ITimeSlot {
	uuid: string;
	hours?: number;
	minutes?: number;
}

export interface ISingleFilm {
	timeSlots: ITimeSlot[];
	title: string;
	age: number | null;
	pCard: boolean | null;
	price: number;
	uuid: string;
}

export interface IDaySchedule {
	date: moment.Moment;
	isWorkingDay: boolean;
	lineBreakIndex: number;
	films: Array<ISingleFilm>;
}
