import { Link } from "./router/Link";
import { Routes } from "./router/Routes";
import { Route } from "./router/Route";

const HomePage = () => <h1>Home</h1>;
const AboutPage = () => <h1>About</h1>;
const ContactPage = () => <h1>Contact</h1>;
const NotFoundPage = () => <h1>404 Not Found</h1>;

export default function App() {
  return (
    <div>
      <nav style={{ display: "flex", gap: "12px", marginBottom: "20px" }}>
        <Link to="/">HOME</Link>
        <Link to="/about">ABOUT</Link>
        <Link to="/contact">CONTACT</Link>
      </nav>

      <Routes>
        <Route path="/" component={HomePage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/contact" component={ContactPage} />
        <Route path="*" component={NotFoundPage} />
      </Routes>
    </div>
  );
}