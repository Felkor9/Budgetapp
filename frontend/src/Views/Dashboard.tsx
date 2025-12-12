import { useEffect, useState, useContext } from "react";
import { ChartComponent } from "../Components/ChartComponent";
import { toast } from "react-toastify";
import GlobalContext from "../GlobalContext";

interface Transaction {
	id: number;
	userId: number;
	description: string;
	amount: number;
	category_id: number;
	name: string;
	type: string;
}
interface Settings {
	user_id: number;
	salary: number;
}
interface Category {
	id: number;
	name: string;
	type: string;
	user_id: number;
}

function Dashboard() {
	const [salary, setSalary] = useState<number | null>(null);
	const [transactions, setTransactions] = useState<Transaction[]>([]);
	const [isAddTransactionOpen, setIsAddTransactionOpen] = useState(false);
	const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);
	const [desc, setDesc] = useState<string>("");
	const [amount, setAmount] = useState<number | string>("");
	const [categoryId, setCategoryId] = useState<number>(0);
	const [cat, setCat] = useState<string>("");
	const [type, setType] = useState<string>("");
	const [categories, setCategories] = useState<Category[]>([]);
	const { loggedInUserId } = useContext(GlobalContext);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const settingsRes = await fetch("/api/settings");
				const settingsData: Settings[] = await settingsRes.json();
				const initialSalary = settingsData[0]?.salary || 0;
				setSalary(initialSalary);

				fetch(`/api/transactions?user_id=${loggedInUserId}`)
					.then((res) => res.json())
					.then((data) => {
						if (Array.isArray(data)) {
							setTransactions(data);
						} else {
							setTransactions([]);
						}
					})
					.catch(() => {
						setTransactions([]);
					});
			} catch (error) {
				console.error("Error fetching data:", error);
			}
			fetch(`/api/categories?user_id=${loggedInUserId}`)
				.then((res) => res.json())
				.then((data) => {
					setCategories(data);
				})
				.catch(() => {
					toast.error("Kunde inte lädda kategorier");
				});
		};

		fetchData();
	}, []);

	const handleAddTransaction = async () => {
		try {
			const res = await fetch("/api/transactions", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					description: desc,
					amount,
					category_id: categoryId,
					user_id: loggedInUserId,
				}),
			});

			if (res.ok) {
				toast.success("Transaction added successfully");
				setIsAddTransactionOpen(false);
			} else {
				toast.error("Failed to add transaction");
			}
		} catch {
			toast.error("Kunde inte lägga till transaction");
		}
	};

	const handleAddCategory = async () => {
		try {
			const res = await fetch("/api/categories", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					name: cat,
					type,
					user_id: loggedInUserId,
				}),
			});
			if (res.ok) {
				toast.success("Category added successfully");
				setIsAddCategoryOpen(false);
			}
		} catch {
			toast.error("Kunde inte lägga till kategori");
		}
	};

	// Beräkna totals efter fetch
	const totalAmount = transactions.reduce((sum, t) => sum + t.amount, 0);
	const totalLeft = (salary ?? 0) - totalAmount;

	// const removeDupes = Array.from(new Map(transactions.map((t) => [t.name, t])).values());
	return (
		<>
			<div className="bg-blue-200 flex flex-col items-center justify-start p-3 min-h-[100vh]">
				<div className="w-full p-3 bg-white rounded-lg flex items-center justify-start gap-3 mb-5">
					<div className=" flex items-center justify-center w-[4	0px] bg-blue-900/60 h-[40px] rounded-full text-white p-4">
						<h1 className="text-white text-xl font-bold">SEK: </h1>
					</div>
					<h1 className="font-bold text-xl">{totalLeft}:-</h1>
				</div>
				<div
					data-cy="chart-div"
					className=" flex items-center justify-center md:w-[400px] lg:w-[500px] xl:w-[600px] 2xl:w-[700px] bg-white p-3 rounded-lg">
					<ChartComponent />
				</div>
				<div className="w-full p-3 bg-white rounded-lg flex flex-col items-center justify-center gap-3 mt-5">
					<div className=" flex items-center justify-center w-[4	0px] bg-blue-900/60 h-[40px] rounded-xl text-white p-4">
						<p>Actions</p>
					</div>
					<button
						data-cy="add-btn"
						className="border p-3 shadow-lg transition-transform duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 rounded-lg bg-blue-500 text-white w-[300px]"
						onClick={() => setIsAddTransactionOpen(true)}>
						Lägg till ny transaction
					</button>
					<button
						className="border p-3 shadow-lg transition-transform duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 rounded-lg bg-blue-500 text-white w-[300px]"
						onClick={() => setIsAddCategoryOpen(true)}>
						Lägg till ny kategori
					</button>
					<button className="border p-3 shadow-lg transition-transform duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 rounded-lg bg-blue-500 text-white w-[300px]">
						Lägg till ny budget
					</button>
				</div>
			</div>
			{isAddTransactionOpen && (
				<div
					className="fixed inset-0 bg-black/40 bg-opacity-50 flex items-center justify-center backdrop-blur-[4px]"
					onClick={() => setIsAddTransactionOpen(false)}>
					<div
						className="bg-white p-6 rounded-lg h-content w-[90%] max-w-md flex flex-col items-center justify-center gap-4"
						onClick={(e) => e.stopPropagation()}>
						<div className="flex items-center justify-center w-[4	0px] bg-blue-900/60 h-[40px] rounded-xl text-white p-5	">
							<h2 className="text-xl">Lägg till ny transaction</h2>
						</div>
						<form className="flex items-center justify-center flex-col gap-4">
							<label className="self-start" htmlFor="desc">
								Beskrivning:
							</label>
							<input
								id="desc"
								data-cy="desc-input"
								type="text"
								value={desc}
								onChange={(e) => setDesc(e.target.value)}
								className="p-3 border-2 rounded-lg bg-white w-[300px]"
							/>
							<label className="self-start" htmlFor="amount">
								Kostnad:
							</label>
							<input
								data-cy="amount-input"
								placeholder="SEK"
								id="amount"
								type="number | text"
								value={amount}
								className="p-3 border-2 rounded-lg bg-white w-[300px]"
								onChange={(e) => setAmount(Number(e.target.value))}
							/>
							<div className="flex flex-wrap justify-center gap-4">
								{categories &&
									categories.map((c) => (
										<div key={c.id} className=" flex items-center justify-center">
											<label className="flex items-center gap-2">
												<input
													data-cy="category-checkbox"
													onChange={(e) => setCategoryId(Number(e.target.value))}
													className="p-3"
													type="checkbox"
													value={c.id}
												/>
												{c.name}
											</label>
										</div>
									))}
							</div>
							<button
								data-cy="add-transaction-btn"
								className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg w-[300px]"
								onClick={() => handleAddTransaction()}>
								Lägg till
							</button>
						</form>
					</div>
				</div>
			)}
			{isAddCategoryOpen && (
				<div
					className="fixed inset-0 bg-black/40 bg-opacity-50 flex items-center justify-center backdrop-blur-[4px]"
					onClick={() => setIsAddCategoryOpen(false)}>
					<div
						className="bg-white p-6 rounded-lg h-100 w-[90%] max-w-md flex flex-col items-center justify-center gap-4"
						onClick={(e) => e.stopPropagation()}>
						<div className="flex items-center justify-center w-[4	0px] bg-blue-900/60 h-[40px] rounded-xl text-white p-5	">
							<h2 className="text-xl">Lägg till ny transaction</h2>
						</div>
						<form className="flex items-center justify-center flex-col gap-4">
							<label className="self-start" htmlFor="cat">
								Namn på kategori:
							</label>
							<input
								id="cat"
								placeholder="Namn (Hälsa)"
								type="text"
								value={cat}
								onChange={(e) => setCat(e.target.value)}
								className="p-3 border-2 rounded-lg bg-white w-[300px]"
							/>
							<label className="self-start" htmlFor="type">
								Vilken typ av kategori:
							</label>
							<input
								id="type"
								placeholder="Typ"
								type="text"
								value={type}
								className="p-3 border-2 rounded-lg bg-white w-[300px]"
								onChange={(e) => setType(e.target.value)}
							/>
							<div className="flex flex-wrap justify-center gap-4"></div>
							<button
								className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg w-[300px]"
								onClick={() => handleAddCategory()}>
								Lägg till
							</button>
						</form>
					</div>
				</div>
			)}
		</>
	);
}

export default Dashboard;
