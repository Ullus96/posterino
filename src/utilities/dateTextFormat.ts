import { computed } from 'vue';
import { useStore } from '@/store/useStore';
import type { Ref } from 'vue';
import { IDaySchedule } from '@/types/films';

export function useDateTextFormat(localStorageSchedule?: string): Ref<string> {
	const store = useStore();

	// TODO: завтра доделаю
	// if (localStorageSchedule) {

	// } else {

	const scheduleData: Array<IDaySchedule> | [] = store.state.schedule || [];
	// }

	const dateTextFormat = computed(() => {
		let result = '';

		if (scheduleData?.length) {
			const nextDay = scheduleData[0].date.locale('ru');
			const endOfWeekDay =
				scheduleData[scheduleData.length - 1].date.locale('ru');

			if (nextDay.format('MM') === endOfWeekDay.format('MM')) {
				result = `${nextDay.format('DD')} - ${endOfWeekDay.format('DD MMMM')}`;
			} else {
				result = `${nextDay.format('DD MMM')} - ${endOfWeekDay.format(
					'DD MMM'
				)}`;
			}
		} else {
			result = '';
		}

		return result;
	});

	return dateTextFormat;
}
