import Stripe from 'stripe';
import { fakeDB } from '../fakeDB/storage.js';
import httpStatus from 'http-status';
import dotenv from 'dotenv';

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_KEY);

function handleHistory(req, res) {
	return res.status(httpStatus.OK).send(fakeDB.fakeDatabaseHistory);
}

async function handleOrder(req, res) {
	const SUCCESS_URL = 'http://localhost:3000/history';
	const FAILURE_URL = 'http://localhost:3000/cart';

	try {
		const items = req.body.items;

		//Method 1: METHOD BELLOW GENERATES A PAYMENT PAGE
		const session = await stripe.checkout.sessions.create({
			payment_method_types: ['card'],
			mode: 'payment',
			line_items: req.body.items.map((item) => {
				const storeItem = fakeDB.fakeDatabaseItems[item.id - 1];
				return {
					price_data: {
						currency: 'brl',
						product_data: {
							name: storeItem.name,
						},
						unit_amount: storeItem.price * 100,
					},
					quantity: item.quantity,
				};
			}),
			success_url: `${SUCCESS_URL}`,
			cancel_url: `${FAILURE_URL}`,
		});

		const newHistory = {
			id: fakeDB.fakeDatabaseHistory.length + 1,
			items: items,
			paymentId: session.id,
			valid: false,
		};

		fakeDB.fakeDatabaseHistory.push(newHistory);

		return res.json({ url: session.url, id: session.id });

		//Method 2: METHOD BELLOW ALLOWS FOR THE BACKEND TO HANDLE THE PAYMENT
		//PROBLEM: paymentMethod is not used then creating a new charge
		// const newPaymentMethod = await stripe.paymentMethods.create({
		// 	type: 'card',
		// 	card: {
		// 		number: '4242424242424242',
		// 		exp_month: 8,
		// 		exp_year: 2024,
		// 		cvc: '314',
		// 	},
		// });

		// const stripeBody = {
		// 	amount: items.map(
		// 		(item) => fakeDB.fakeDatabaseItems[item.id - 1].price * +item.quantity
		// 	)[0],
		// 	currency: 'brl',
		// 	source: 'tok_' + newPaymentMethod.card.brand,
		// 	description:
		// 		'My First Test Charge (created for API docs at https://www.stripe.com/docs/api)',
		// };

		// stripe.charges
		// 	.create(stripeBody)
		// 	.then((resp) => {
		// 		if (resp.outcome.type === 'authorized') {
		// 			console.log(1);
		// 			const newHistory = {
		// 				id: fakeDB.fakeDatabaseHistory.length + 1,
		// 				transactionId: resp.id,
		// 				customer: resp.customer,
		// 				total: resp.amount,
		// 				outcome: resp.outcome,
		// 				paid: resp.paid,
		// 				payment_method_details: resp.payment_method_details,
		// 			};

		// 			fakeDB.fakeDatabaseHistory.push(newHistory);
		// 			return res.send({ url: SUCCESS_URL });
		// 		} else {
		// 			console.log(2);
		// 			res.send({ url: FAILURE_URL });
		// 		}
		// 	})
		// 	.catch((err) => {
		// 		if (err.outcome?.type === 'authorized') {
		// 			console.log(3);
		// 			fakeDB.fakeDatabaseHistory.push(items);
		// 			return res.send({ url: SUCCESS_URL });
		// 		} else {
		// 			console.log(4);
		// 			return res.send({ url: FAILURE_URL });
		// 		}
		// 	});
	} catch (e) {
		res.status(500).json({ error: e.message });
	}
}

//cs_test_b1Z8kf353ZDss7HVYkZrbZozmTT5vsbpR10hgtYefgs9yL65ypmriiB7uF
//cs_test_a1o32dDd3mYcxsJGKIHRPSLbXg02mDiS4QMX1wgltMko0R8jQqyWEaWns

function sendItems(req, res) {
	return res.status(httpStatus.OK).send(fakeDB.fakeDatabaseItems);
}

async function verifyPayment(req, res) {
	const paymentId = req.query.paymentId;
	const events = await stripe.events.list();

	console.log(paymentId);

	for (let i = 0; i < events.data.length; i++) {
		if (events.data[i].data.object.id === paymentId) {
			const data = events.data[i].data;
			if (data.object.payment_status === 'paid') {
				fakeDB.fakeDatabaseHistory = fakeDB.fakeDatabaseHistory.map((e) =>
					e.paymentId === paymentId ? { ...e, valid: true } : e
				);
			}

			return res.sendStatus(httpStatus.OK);
		}
	}

	return res.status(httpStatus.OK).send(events);
}

export const mid = { handleHistory, handleOrder, sendItems, verifyPayment };
