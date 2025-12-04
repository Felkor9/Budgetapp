import { Link } from "react-router";

function LandingPage() {
	return (
		<>
			<div className="h-[50dvh] flex flex-col items-center justify-center bg-blue-50">
				<h1 className="text-lg">My budget app</h1>
				<h2 className="text-md">Your best friend</h2>
			</div>
			<div className="h-[50dvh] flex flex-row items-center justify-center gap-10 bg-blue-50">
				<button className="border-1 p-3 rounded-lg cursor-pointer">
					<Link to={"/login"}>Logga in</Link>
				</button>
				<button className="border-1 p-3 rounded-lg cursor-pointer">
					<Link to={"/createuser"}>Skapa konto</Link>
				</button>
			</div>
		</>
	);
}

export default LandingPage;
