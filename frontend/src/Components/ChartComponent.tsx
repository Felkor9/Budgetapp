import { useState, useEffect, useContext } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, type TooltipItem } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);
import GlobalContext from "../GlobalContext";

interface Transaction {
	transactionId: number;
	user_id: number;
	description: string;
	amount: number;
	category_id: number;
	name: string;
	type: string;
}

export function ChartComponent() {
	const [transactions, setTransactions] = useState<Transaction[]>([]);
	const { loggedInUserId } = useContext(GlobalContext);

	useEffect(() => {
		fetch(`/api/transactions?user_id=${loggedInUserId}`)
			.then((res) => res.json())
			.then((data: Transaction[]) => {
				if (Array.isArray(data)) {
					setTransactions(data);

					// console.log(data);
				} else {
					setTransactions([]);
				}
			})
			.catch((err) => {
				console.error("Fetch error:", err);
				setTransactions([]);
			});
	}, [loggedInUserId]);

	// const label = transactions.map((t) => t.description);
	const labels = transactions.map((t) => t.description);
	const dataValues = transactions.map((t) => t.amount);
	const colors = [
		"rgb(255, 99, 132)",
		"rgb(54, 162, 235)",
		"rgb(255, 205, 86)",
		"rgb(75, 192, 192)",
		"rgb(153, 102, 255)",
		"rgb(255, 159, 64)",
	];

	const data = {
		labels,
		datasets: [
			{
				label: "Kostnad",
				data: dataValues,
				backgroundColor: colors.slice(0, transactions.length),
				hoverOffset: 4,
			},
		],
	};

	const options = {
		responsive: true,
		plugins: {
			tooltip: {
				callbacks: {
					label: function (tooltipItem: TooltipItem<"doughnut">) {
						const idx = tooltipItem.dataIndex;
						const transaction = transactions[idx];
						return `${transaction.amount} SEK - ${transaction.description}`;
					},
				},
			},
		},
	};

	return <Doughnut data-cy="chart-component" data={data} options={options} />;
}
