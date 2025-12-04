import { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, type TooltipItem } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

interface Transaction {
	transactionId: number;
	userId: number;
	description: string;
	amount: number;
	categoryName: string;
	categoryType: string;
}

export function ChartComponent() {
	const [transactions, setTransactions] = useState<Transaction[]>([]);

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (!token) {
			console.error("No token found");
			return;
		}

		fetch("/api/transactions", {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
			.then((res) => res.json())
			.then((data) => {
				if (Array.isArray(data)) {
					setTransactions(data);
					console.log(data);
				} else {
					console.error("Unexpected data from API:", data);
					setTransactions([]);
				}
			})
			.catch((err) => {
				console.error("Fetch error:", err);
				setTransactions([]);
			});
	}, []);

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
						// Visa amount + description när man hovrar
						const idx = tooltipItem.dataIndex;
						const transaction = transactions[idx];
						return `${transaction.categoryName}: ${transaction.amount} SEK - ${transaction.description}`;
					},
				},
			},
		},
	};

	return <Doughnut data={data} options={options} />;
}
