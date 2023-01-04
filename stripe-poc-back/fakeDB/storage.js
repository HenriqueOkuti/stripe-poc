const fakeDatabaseItems = [
	{ id: 1, name: 'Maroon X 11', hex: 'B8336A', price: parseInt('B833', 16) },
	{ id: 2, name: 'Wisteria', hex: 'C490D1', price: parseInt('C490', 16) },
	{
		id: 3,
		name: 'Maximum Blue Purple',
		hex: 'ACACDE',
		price: parseInt('ACAC', 16),
	},
	{ id: 4, name: 'Uranian Blue', hex: 'ABDAFC', price: parseInt('ABDA', 16) },
	{
		id: 5,
		name: 'Azure X 11 Web Color',
		hex: 'E5FCFF',
		price: parseInt('E5FC', 16),
	},
	{ id: 6, name: 'Phtalo Green', hex: '14281D', price: parseInt('1428', 16) },
	{ id: 7, name: 'Hunter Green', hex: '355834', price: parseInt('3558', 16) },
	{ id: 8, name: 'Antique Bronze', hex: '6E633D', price: parseInt('6E63', 16) },
	{
		id: 9,
		name: 'Light French Beige',
		hex: 'C2A878',
		price: parseInt('C2A8', 16),
	},
	{ id: 10, name: 'Baby Powder', hex: 'F1F5F2', price: parseInt('F1F5', 16) },
];

const fakeDatabaseHistory = [{ id: 1, info: null }];

export const fakeDB = { fakeDatabaseHistory, fakeDatabaseItems };
