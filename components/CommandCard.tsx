import type { CommandCardDef } from "@/types";
import CommandBlock from "./CommandBlock";
import Link from "next/link";

interface Props {
  card: CommandCardDef;
  sectionLabel: string;
}

const CARD_TO_VISUALIZER: Record<string, string> = {
  "branch-basics": "branch",
  "merge-rebase": "merge",
  "undo-changes": "reset",
  stash: "stash",
  "cherry-pick": "cherry-pick",
  "interactive-rebase": "rebase",
};

export default function CommandCard({ card, sectionLabel }: Props) {
  const vizCmd = CARD_TO_VISUALIZER[card.id];

  return (
    <div
      id={card.id}
      className="card bg-(--card) border border-(--border) rounded-xl overflow-hidden transition-[border-color,transform] duration-200 min-w-0"
    >
      <div className="pt-[14px] px-[18px] pb-[10px] flex items-center gap-[10px] border-b border-(--border)">
        <div
          className={`ic-${card.iconVariant} w-7 h-7 rounded-[7px] flex items-center justify-center text-[0.9rem] shrink-0`}
        >
          {card.icon}
        </div>
        <div>
          <h3 className="text-[0.9rem] font-bold">{card.title}</h3>
          <p className="text-[0.72rem] text-(--muted) mt-px">{card.subtitle}</p>
        </div>
      </div>

      <div className="pt-[14px] px-[18px] pb-4 min-w-0 overflow-hidden">
        {card.commands.map((cmd, idx) => (
          <CommandBlock
            key={cmd.label}
            command={cmd}
            cardId={card.id}
            cardTitle={card.title}
            section={sectionLabel}
            style={
              idx === card.commands.length - 1 ? { marginBottom: 0 } : undefined
            }
          />
        ))}
        {vizCmd && (
          <Link
            href={`/visualizer?cmd=${vizCmd}`}
            className="flex items-center gap-1.5 text-xs text-(--accent) hover:underline mt-3 font-mono transition-opacity opacity-80 hover:opacity-100"
          >
            See it in action
            <span>→</span>
          </Link>
        )}
      </div>
    </div>
  );
}
