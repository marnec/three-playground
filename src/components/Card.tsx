import type { PropsWithChildren } from "react";

interface CardProps extends PropsWithChildren {
  title: string;
  description: string;
}

function Card({ title, description }: CardProps) {
  return (
    <div className="w-80 h-80 border-2 rounded-sm">
      <div>{title}</div>
      <div>{description}</div>
    </div>
  );
}

export default Card;
