import { Link } from "react-router-dom";

function Navbar() {
return (
<nav
style={{
width: "100%",
background: "#0d47a1",
padding: "12px 25px",
display: "flex",
alignItems: "center",
justifyContent: "space-between",
boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
position: "sticky",
top: 0,
zIndex: 100,
}}
>
<div style={{ fontSize: "24px", fontWeight: "600" }}>
<Link
to="/"
style={{
color: "white",
textDecoration: "none",
letterSpacing: "0.5px",
}}
>
IdeaShare </Link> 
</div>
  <ul
    style={{
      display: "flex",
      listStyle: "none",
      gap: "22px",
      margin: 0,
      padding: 0,
    }}
  >
    <li>
      <Link
        to="/"
        style={{
          color: "white",
          textDecoration: "none",
          fontSize: "16px",
          padding: "6px 10px",
        }}
      >
        Home
      </Link>
    </li>

    <li>
      <Link
        to="/dashboard"
        style={{
          color: "white",
          textDecoration: "none",
          fontSize: "16px",
          padding: "6px 10px",
        }}
      >
        Explore
      </Link>
    </li>

    <li>
      <Link
        to="/add"
        style={{
          color: "white",
          textDecoration: "none",
          fontSize: "16px",
          padding: "6px 10px",
        }}
      >
        Add Idea
      </Link>
    </li>

    <li>
      <Link
        to="/login"
        style={{
          color: "#ffeb3b",
          textDecoration: "none",
          fontSize: "16px",
          fontWeight: "600",
          padding: "6px 10px",
        }}
      >
        Login
      </Link>
    </li>
  </ul>
</nav>

);
}

export default Navbar;
