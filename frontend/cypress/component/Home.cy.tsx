import Home from "../../src/Views/Home.tsx";
import { MemoryRouter } from "react-router-dom";
import GlobalContext from "../../src/GlobalContext.ts";

describe("Home.cy.tsx", () => {
	it("Testar att logga in en användare", () => {
		cy.mount(
			<MemoryRouter>
				<GlobalContext.Provider
					value={{
						loggedInUserId: "1",
						setLoggedInUserId: () => {},
						users: [],
						setUsers: () => {},
					}}>
					<Home />
				</GlobalContext.Provider>
			</MemoryRouter>
		);
		cy.get('[data-cy="email"]').type("admin");
		cy.get('[data-cy="password"]').type("admin");
		cy.get('[data-cy="login-button"]').should("exist");
		cy.get('[data-cy="login-button"]').click();
		cy.intercept("POST", "http://localhost:3000/api/login", {
			statusCode: 200,
			body: { user: { id: "1", email: "admin" } },
		}).as("loginRequest");
	});
});
