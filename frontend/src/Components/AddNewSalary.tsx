import { useEffect, useState, useContext } from "react";
import GlobalContext from "../GlobalContext";
import { toast } from "react-toastify";

interface Settings {
	salary: number;
	user_id: number;
}

function AddNewSalary() {
	const [isAddSalaryVisible, setIsSalaryVisible] = useState(false);
	const [salary, setSalary] = useState<number>(0);

	const [currentSalary, setCurrentSalary] = useState<number>(0);

	const { loggedInUserId } = useContext(GlobalContext);

	useEffect(() => {
		if (!loggedInUserId) return;

		fetch(`/api/settings?user_id=${loggedInUserId}`)
			.then((res) => res.json())
			.then((data: Settings[]) => {
				const fetchedSalary = data[0]?.salary ?? 0;
				setCurrentSalary(fetchedSalary);
			});
	}, [loggedInUserId]);

	const handleUpdate = async () => {
		try {
			const response = await fetch(`/api/salary`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					salary,
					user_id: loggedInUserId,
				}),
			});

			if (response.ok) {
				setCurrentSalary(salary);
				toast.success("Lön uppdaterad");
			}
		} catch {
			toast.error("Kunde inte lägga till lön");
		}
	};

	return (
		<>
			<button
				className="border p-3 shadow-lg transition-transform duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 rounded-lg bg-blue-500 text-white w-[300px]"
				data-cy="add-salary-btn"
				onClick={() => setIsSalaryVisible(true)}>
				Uppdatera din lön
			</button>

			{isAddSalaryVisible && (
				<div
					data-cy="salary-container"
					onClick={() => setIsSalaryVisible(false)}
					className="fixed inset-0 bg-black/40 bg-opacity-50 flex items-center justify-center backdrop-blur-[4px]">
					<div
						className="bg-white p-6 rounded-lg h-content w-[90%] max-w-md flex flex-col items-center justify-center gap-4"
						onClick={(e) => e.stopPropagation()}>
						<div className="flex items-center justify-center w-[4	0px] bg-blue-900/60 h-[40px] rounded-xl text-white p-5	">
							<h2 className="text-xl">Uppdatera din lön</h2>
						</div>
						<p>Din nuvarande lön: {currentSalary}</p>

						<p data-cy="salary">Min nya lön: {salary!}</p>
						<input
							data-cy="salary-input"
							type="number"
							className="border p-3 rounded-2xl"
							value={salary}
							onChange={(e) => setSalary(Number(e.target.value))}
						/>
						<button
							data-cy="update-salary-btn"
							className="border p-3 shadow-lg transition-transform duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 rounded-lg bg-blue-500 text-white w-[300px]"
							onClick={handleUpdate}>
							Uppdatera
						</button>
					</div>
				</div>
			)}
		</>
	);
}

export default AddNewSalary;
