const postData = async (url, data) => {  // async говорить, що код асинххронний
	const res = await fetch(url, {// авейт - каже зачекати поки від фетча не прийде результат
		method: "POST",
		headers: {
			'Content-type': 'application/json'
		},
		body: data
	});
	return await res.json();
};

async function getResource(url) {  // async говорить, що код асинххронний
	let res = await fetch(url);             // авейт - каже зачекати поки від фетча не прийде результат

	if (!res.ok) {
		throw new Error(`Could not fetch ${url}, status: ${res.status}`);
	}

	return await res.json();
};

export { postData };
export { getResource };