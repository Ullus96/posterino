export const filmPool: string[] = [
	'Маша и медведь. Парк чудес',
	'Операция “Преемник”',
	'Приключения Паддингтона 3',
	'Звезды в Сибири',
	'Ветренная река',
	'Станция «Фрутвейл»',
	'Старикам тут не место',
	'Судзуме, закрывающая двери',
	'Монах и Ружье',
	'Таксист',
	'Подземелья и Драконы; Честь среди воров',
	'Семь',
	'Перестрелка',
	'Большой Лебовски',
	'U-boot',
];

export function getRandomFilm(filmsArr: string[]) {
	return filmsArr[Math.floor(Math.random() * filmsArr.length)];
}

export function randomNumInRange(min: number, max: number) {
	return Math.floor(Math.random() * (max - min) + min);
}

export function randomTrueOrFalse() {
	return Math.random() > 0.33 ? 1 : 0;
}
