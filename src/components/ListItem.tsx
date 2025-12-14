import type { PropsWithChildren } from "react";

interface CardProps extends PropsWithChildren {
  title: string;
  description: string;
}

function ListItem({ title, description }: CardProps) {
  return (
    <div className="w-full h-20 border-2 rounded-sm p-2 flex items-center gap-5 hover:bg-accent hover:text-white">
      <span className="font-bold">{title}</span>
      <span>|</span>
      <span>{description}</span>
      <span className="flex-1 text-end text-2xl pr-5">{'->'}</span>
    </div>
  );
}

export default ListItem;
