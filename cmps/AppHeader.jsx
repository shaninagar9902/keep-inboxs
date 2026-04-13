const { Link, NavLink } = ReactRouterDOM

export function AppHeader() {

    return <header className="app-header">
        <Link to="/">
            <h3>Appsus</h3>
        </Link>
        <nav>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/Email">Email</NavLink>
            <NavLink to="/note">Note</NavLink>
        </nav>
    </header>
}
