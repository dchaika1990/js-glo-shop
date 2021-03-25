export const getGoods = async () => {
	const result = await fetch('assets/db/db.json');
	if (!result.ok) {
		throw new Error('Error - ' + result.status);
	}
	return await result.json();
}