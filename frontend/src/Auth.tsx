import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

interface User {
	id: number;
	email: string;
	name: string;
}

export function useAuth() {
	const navigate = useNavigate();

	const [user, setUser] = useState<User | null>(() => {
		const stored = localStorage.getItem("user");
		return stored ? JSON.parse(stored) : null;
	});

	const loginUser = (userData: User, token: string) => {
		localStorage.setItem("user", JSON.stringify(userData));
		localStorage.setItem("token", token);
		setUser(userData);
		toast.success(`Du är nu inloggad som ${userData.name}`);
		navigate("/dashboard");
	};

	const logoutUser = () => {
		localStorage.removeItem("user");
		localStorage.removeItem("token");
		setUser(null);
		toast.success("Du är nu utloggad");
		navigate("/");
	};

	return { user, loginUser, logoutUser };
}
