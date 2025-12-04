import { useEffect, useState } from "react";
import { ChartComponent } from "../components/ChartComponent.tsx";

interface Transaction {
	transactionId: number;
	userId: number;
	description: string;
	amount: number;
	categoryName: string;
	categoryType: string;
}

function Dashboard() {
	const [transactions, setTransactions] = useState<Transaction[]>([]);
	const [isAddTransaction, setIsAddtransaction] = useState<boolean>(false);
	const [amount, setAmount] = useState<number | undefined>();
	const [desc, setDesc] = useState<string>("");

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
				} else {
					console.error("Unexpected data from API:", data);
					setTransactions([]);
				}
			})
			.catch((err) => {
				console.error("Fetch error:", err);
				setTransactions([]);
			});
	});

	const totalAmount = transactions.reduce((sum, t) => sum + t.amount, 0);

	// const handleAddTransaction = () => {
	// 	fetch("/api/transaction", {
	// 		method: "POST",
	// 		headers: { "Content-Type": "application/json" },
	// 		body: JSON.stringify({category_id, amount, description }),
	// 	});
	// }

	const removeDupes = Array.from(new Map(transactions.map((t) => [t.categoryName, t])).values());

	return (
		<>
			<div className="flex flex-col items-center justify-start bg-blue-50 p-4 md:p-8 h-screen gap-6 ">
				<h1 className="text-2xl md:text-4xl mb-4">Dashboard</h1>

				<div className="w-full md:w-4/5 bg-green-900/80 p-4 flex flex-col md:flex-row gap-4 rounded-lg">
					<div>
						<p className="font-bold text-lg text-white">SEK: {totalAmount}:-</p>
					</div>
				</div>

				<h3 className="self-start mt-4 font-light">Mitt hushåll:</h3>

				<div className="w-full flex items-center justify-center max-w-md h-64 md:h-96 mt-4">
					<ChartComponent />
				</div>

				<div className="flex flex-col md:flex-row gap-3 mt-6 w-full md:w-4/5">
					<button
						className="border p-2 rounded-lg cursor-pointer hover:underline bg-blue-900/80 text-white"
						onClick={() => setIsAddtransaction(true)}>
						Lägg till köp
					</button>
					<button className="border p-2 rounded-lg cursor-pointer hover:underline bg-blue-900/80 text-white">
						Lägg till kategori
					</button>
					<button className="border p-2 rounded-lg cursor-pointer hover:underline bg-blue-900/80 text-white">
						Ändra budget
					</button>
				</div>
			</div>

			{isAddTransaction && (
				<div
					className="absolute z-100 w-dvw h-dvh top-0 left-0 flex items-center justify-center bg-black/50 backdrop-blur-xs"
					onClick={() => setIsAddtransaction(false)}>
					<div
						className="bg-white w-[300px] h-[400px] p-2 rounded-lg flex items-center justify-center flex-col gap-3"
						onClick={(e) => e.stopPropagation()}>
						<div className="w-full flex text-center justify-center bg-black/20 rounded-lg">
							<h1 className="p-3">Lägg till transaktion</h1>
						</div>
						<label className="self-start ml-10" htmlFor="desc">
							Vad?
						</label>
						<input
							id="desc"
							value={desc}
							onChange={(e) => setDesc(e.target.value)}
							type="text"
							className="p-3 border-1 rounded-lg mt-0"
							placeholder="Vad har du köpt?"
						/>
						<label className="self-start ml-10" htmlFor="amount">
							Kostnad:
						</label>
						<input
							id="amount"
							type="number"
							value={amount}
							onChange={(e) => setAmount(Number(e.target.value))}
							className="p-3 border-1 rounded-lg"
							placeholder="Hur mycket kostade den?(SEK)"
						/>
						<div className="flex flex-wrap justify-center gap-4">
							{removeDupes.map((t) => (
								<div key={t.transactionId} className=" flex items-center justify-center">
									<label className="flex items-center gap-2">
										<input className="p-3" type="checkbox" value={t.userId} />
										{t.categoryName}
									</label>
								</div>
							))}
						</div>

						<button className="border-1 p-2 cursor-pointer bg-blue-900/80 text-white rounded-lg w-[100px]">
							Lägg till
						</button>
					</div>
				</div>
			)}
		</>
	);
}

export default Dashboard;
