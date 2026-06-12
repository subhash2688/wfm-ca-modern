"use client";

interface ScrollLinkProps {
  href: string;
  targetId: string;
  typeParam?: string;
  className?: string;
  children: React.ReactNode;
}

export function ScrollLink({ href: _href, targetId, typeParam, className, children }: ScrollLinkProps) {
  function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
    if (typeParam) {
      window.history.replaceState({}, "", `?type=${typeParam}#${targetId}`);
    }
  }

  return (
    <a
      href={typeParam ? `?type=${typeParam}#${targetId}` : `#${targetId}`}
      onClick={handleClick}
      className={className}
    >
      {children}
    </a>
  );
}
