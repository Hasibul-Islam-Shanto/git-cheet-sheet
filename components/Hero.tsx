export default function Hero() {
  return (
    <header className="w-full px-6 pt-10 pb-[44px] relative overflow-hidden">
      <div className="relative z-10 max-w-[560px] mx-auto text-center">
        <div className="inline-block bg-[rgba(247,201,72,0.10)] border border-[rgba(247,201,72,0.25)] text-(--accent) font-mono text-[0.62rem] tracking-[0.18em] px-[13px] py-[4px] rounded-full mb-4 uppercase">
          Developer Reference
        </div>

        <h1 className="text-[clamp(1.8rem,3vw,2.6rem)] font-extrabold leading-[1.2] tracking-[-0.02em]">
          Git &amp; <span className="text-(--accent)">GitHub</span>
          <br />
          Cheat Sheet
        </h1>

        <p className="text-(--muted) mt-3 text-[0.83rem] leading-[1.7]">
          A concise, hands-on reference for every Git command — with real
          examples, GitHub workflow, and recovery techniques all in one place.
        </p>

        <p className="text-(--muted) mt-[10px] text-[0.72rem] font-mono tracking-[0.04em]">
          $ every command · with examples · explained simply
        </p>

        <div className="w-9 h-[2px] bg-(--accent) mx-auto mt-[18px] rounded-sm opacity-40" />
      </div>
    </header>
  );
}
