import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../Auth";
import { Link } from "react-router";

function LogIn() {
	const [password, setPassword] = useState<string>("");
	const [email, setEmail] = useState<string>("");
	const { loginUser } = useAuth();
	useEffect(() => {
		fetch("/api/users")
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
			});
	}, []);

	const handleLogin = async (e: React.FormEvent) => {
		try {
			e.preventDefault();
			const response = await fetch("/api/login", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email, password }),
			});
			const data = await response.json();
			if (response.ok) {
				loginUser(data.user, data.token);
			} else {
				toast.error(data.message);
			}
		} catch (err) {
			toast.error("kunde inte logga in");
			console.error(err);
		}
	};

	return (
		<>
			<div className="bg-white-50 h-[100vh] flex items-center justify-center flex-col bg-blue-50">
				<h1 className="text-xl font-bold">Welcome</h1>
				<form action="" className="flex flex-col ">
					<label htmlFor="email">Email</label>
					<input
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
						id="password"
						autoComplete="true"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						type="password"
						placeholder="Password"
						className="p-3 border-2 rounded-lg bg-white w-[300px]"
					/>
					<p className="self-center">
						har du inget konto?
						<Link className="text-blue-600 underline" to="/createuser">
							{" "}
							Skapa Här
						</Link>
					</p>
					<button
						className="border-1 mt-7 bg-black text-white p-3 w-[60%] self-center rounded-lg"
						onClick={handleLogin}>
						Log in
					</button>
				</form>
			</div>
		</>
	);
}

export default LogIn;
