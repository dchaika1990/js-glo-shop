export const getGoods = async () => {
	const result = await fetch('assets/db/db.json');
	if (!result.ok) {
		throw new Error('Error - ' + result.status);
	}
	return await result.json();
}

export const postData = async (url, dataUser) => {
	let res = await fetch( url,
		{
			method: 'POST',
			body: dataUser
		}
	)
	return await res.json()
}
