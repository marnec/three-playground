import { Link } from "react-router";
import { experiments } from "./Routes";
import Card from "./components/Card";

function Home() {
  return (
    <div className="p-5 flex flex-row flex-wrap gap-5">
      {experiments.map(({ path, title, description }, i) => (
        <div key={i}>
          <Link to={path}>
            <Card title={title} description={description}></Card>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default Home;
