import { Markdown } from "../../components/Markdown";
import SinWaveGrid from "./SinWaveGrid";
import SinWavePlane from "./SinWavePlane";

const content = `
This experiment is about creating a wave-like animation. I was always
fascinated by wave-like motion. I find it calming and hypnotic, but
intuitive at the same time.

I knew that to achieve a wave-like effect I would have to use a wave
function somewhere, the first that comes to mind is the sine function
$\\sin(\\alpha)$. Since $\\alpha$ is an angle, its value is expected to be
$0 < \\alpha < 2\\pi$, but I don't really care about it being an angle,
I only care about the fact that this function returns values in the form
of an infinitely cyclical wave for increasing values of $\\alpha$.

This means that I can use this values to set the height of some visual
elements so that they resemble a wave pattern.

The first strategy that came to my minds was to just draw a grid of
simple objects, in this case they are spherical meshes. I didn't bother
with instantiation for performance optimization, they are just a bunch
of spherical geometry meshes placed in a grid of $n$ elements.
Then I recentered the grid by translating all mesh positions by $-n/2$.

At this point I know that I need to set the $y$ coordinate as the
value of $\\sin(\\alpha)$ using the distance from the center as my $\\alpha$.
This only works because the grid is centered on the origin.

<Slot name="grid" />

Now it's time to animate the motion. The animation is just based on
elapsed time $t$. The $y$ coordinate is computed at every frame as the
sine of $t$ plus distance from the center $d=\\sqrt{x^2 + z^2}$.

$$
y = \\sin(d + t)
$$


The distance from center provides the initial position and doesn't
change along time, but $t$ keeps increasing moving every single
mesh up and down with the values of the sine function.

---

The actual result I wanted to get to was to animate a surface in a
similar way. I created a mesh and given it a \`PlaneGeometry\` with
50 segments on both axes. By default, \`PlaneGeometry\`s are created
on the $[xy]$ so it needs to be rotated by $\\pi/2$ radians along the
$x$ axis.

Now I need to do something similar to what I did for the vertical position
of spheres to the vertical position of vertex.

<Slot name="plane" />

It was a bit of a pain to understand how to modify the position of vertex
in a \`BufferGeometry\` because it required to extract the coordinates as 
\`BufferAttribute\`s. From what I can gather geometries are now alwasy stored
as buffer geometries, that are based on a more efficient data structure which, 
in turn, makes it harder to manage its data.

`;

function SinWave() {
  return (
    <div>
      <Markdown
        slots={{
          grid: <SinWaveGrid isAnimated={1} />,
          plane: <SinWavePlane />,
        }}
      >
        {content}
      </Markdown>
    </div>
  );
}

export default SinWave;
