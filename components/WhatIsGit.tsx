import type { WhatIsGitItem } from "@/types";

interface Props {
  items: WhatIsGitItem[];
}

export default function WhatIsGit({ items }: Props) {
  return (
    <div className="what-is-git w-full mb-[50px] bg-(--card) border border-(--border) border-l-4 border-l-(--accent) rounded-xl grid grid-cols-2 gap-6 p-7 md:p-8">
      <h2 className="col-span-2 text-[1.1rem] text-(--accent) font-mono tracking-[0.08em] mb-1">
        {"//"} What is Git?
      </h2>

      {items.map((item) => (
        <div key={item.title} className="flex gap-3 items-start">
          <div className="text-[1.3rem] mt-[2px]">{item.icon}</div>
          <div>
            <strong className="text-(--text) text-[0.9rem] block">
              {item.title}
            </strong>
            <span className="text-(--muted) text-[0.82rem]">
              {item.description}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
