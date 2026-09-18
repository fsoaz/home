export function Mark({ compact = false }: { compact?: boolean }) {
  return (
    <span className="mark" aria-hidden="true">
      <svg viewBox="0 0 44 44"><circle cx="22" cy="22" r="8"/><ellipse cx="22" cy="22" rx="19" ry="8" transform="rotate(-28 22 22)"/><path d="M15 28V15h9M15 21h7M27 28V15l4 8 4-8v13"/></svg>
      {compact ? null : <span>Francisco Micael</span>}
    </span>
  );
}

