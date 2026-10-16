import Link from "next/link";
import styles from "./CtaLink.module.css";

type CtaLinkProps = {
  href: string;
  label: string;
};

export default function CtaLink({ href, label }: CtaLinkProps) {
  return (
    <Link className={styles.link} href={href}>
      {label}
      <span aria-hidden="true">→</span>
    </Link>
  );
}
