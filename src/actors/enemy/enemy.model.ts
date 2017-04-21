export class Enemy {
	constructor() {

		const results: [number] = [
			60, 50, 60, 58, 54, 54, 58, 50, 52, 54, 48, 69, 34, 55, 51, 52, 44, 51, 69, 64, 66, 55, 52, 61, 46, 31, 57, 52, 44, 18,
			41, 53, 55, 61, 51, 44
		];

		function removeDuplicates(arr: [number]) {
			return arr.filter((elem, pos, arr) => arr.indexOf(elem) == pos)
		}

		console.log(removeDuplicates(results));

	}
}
