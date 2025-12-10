import { Link } from "react-router";
import { experiments } from "./Routes";

function Home() {
  return (
    <div className="container">
      {experiments.map(({ path }) => (
        <div className="card">
          <Link to={path}>{path}</Link>
        </div>
      ))}
    </div>
  );
}

export default Home;
