import React, { useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router";
import { useNavigate } from "react-router";

function CreateUser() {
	const [password, setPassword] = useState<string>("");
	const [email, setEmail] = useState<string>("");
	const [name, setName] = useState<string>("");

	const navigate = useNavigate();

	const handleCreate = async (e: React.FormEvent) => {
		try {
			e.preventDefault();
			const response = await fetch("/api/create", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email, password, name }),
			});

			const data = await response.json();
			if (response.ok) {
				toast.success("Konto skapat, var vänlig logga in");
				navigate("/");
				console.log(data);
			}
		} catch {
			toast.error("kunde inte logga in");
		}
	};

	return (
		<>
			<div className="bg-white-50 h-[100vh] flex items-center justify-start flex-col bg-blue-50">
				<h1 className="text-[30px] mb-4 font-bold mt-20">Skapa ditt konto</h1>
				<form action="" className="flex flex-col mt-10 ">
					<label htmlFor="name">Name</label>
					<input
						data-cy="create-name"
						id="name"
						autoComplete="true"
						value={name}
						onChange={(e) => setName(e.target.value)}
						type="text"
						placeholder="Email"
						className="p-3 border-2 rounded-lg bg-white w-[300px]"
					/>
					<label className="mt-4" htmlFor="email">
						Email
					</label>
					<input
						data-cy="create-email"
						id="email"
						autoComplete="true"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						type="text"
						placeholder="Email"
						className="p-3 border-2 rounded-lg bg-white w-[300px]"
					/>
					<label className="mt-4" htmlFor="password">
						Password
					</label>
					<input
						data-cy="create-password"
						id="password"
						autoComplete="true"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						type="password"
						placeholder="Password"
						className="p-3 border-2 rounded-lg bg-white w-[300px]"
					/>

					<button
						className="border-1 mt-7 bg-black text-white p-3 w-[60%] self-center rounded-lg"
						onClick={handleCreate}
						data-cy="create-new-btn">
						Skapa konto
					</button>
					<p className="mt-4 self-center">
						Har du redan ett konto?{" "}
						<Link className="text-blue-500" to="/">
							Logga in!
						</Link>
					</p>
				</form>
			</div>
		</>
	);
}

export default CreateUser;
