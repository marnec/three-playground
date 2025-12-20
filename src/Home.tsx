import { useState, type ReactElement } from "react";
import { Link } from "react-router";
import { experiments } from "./Routes";
import ListItem from "./components/ListItem";

function Home() {
  const [hoveredExample, setHoveredExample] = useState<ReactElement | null>(
    null
  );

  return (
    <div className="p-5 flex justify-between gap-5">
      {/* <div className="w-1/4 border-2 rounded hidden  lg:flex">
        <div className="">{hoveredExample}</div>
      </div> */}
      <div className="flex flex-col container max-w-4xl mx-auto ">
        <p>
          In the era of AI, this is an hidden place where I can still experiment
          and learn, even though everyone wants to convince me that it's not the
          way to go.
        </p>
        <hr className="border" />
        <div className="my-6 flex flex-col gap-3">
          {experiments.map(({ path, title, description, example }, i) => (
            <div
              key={i}
              onMouseOver={() => setHoveredExample(example)}
              onMouseOut={() => setHoveredExample(null)}
            >
              <Link to={path}>
                <ListItem title={title} description={description}></ListItem>
              </Link>
            </div>
          ))}
        </div>
        <hr className="border" />
        <div className="">
          Things I'd like to experiment with:
          <ul className="list-disc">
            <li>a torch in the dark</li>
            <li>grids</li>
            <li>plopping</li>
            <li>roads</li>
            <li>bounce physics</li>
            <li>a-star</li>
            <li>flock behaviour & sprites</li>
            <li>marching cubes</li>
            <li>3dmodel fix pose w/ head follow cursor</li>
            <li>z brush implementation</li>
            <li>shaders? vertex displacement on gpu</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Home;
