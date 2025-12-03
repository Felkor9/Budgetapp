function LandingPage() {
	return (
		<>
			<div className="h-[50dvh] flex flex-col items-center justify-center">
				<h1 className="text-lg">My budget app</h1>
				<h2 className="text-md">Your best friend</h2>
			</div>
			<div className="h-[50dvh] flex flex-row items-center justify-center gap-10">
				<button className="border-1 p-3 rounded-lg cursor-pointer">Logga in</button>
				<button className="border-1 p-3 rounded-lg cursor-pointer">Skapa konto</button>
			</div>
		</>
	);
}

export default LandingPage;
