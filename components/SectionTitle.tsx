interface Props {
  label: string
}

export default function SectionTitle({ label }: Props) {
  return (
    <div className="section-title text-[0.7rem] font-mono tracking-[0.2em] uppercase text-(--accent) mt-12 mb-5 flex items-center gap-3">
      {label}
    </div>
  )
}
