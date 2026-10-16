import styles from "./SectionHeading.module.css";

type SectionHeadingProps = {
  id?: string;
  number: string;
  title: string;
};

// The number sits outside the h2 so the heading text is the title alone.
export default function SectionHeading({ id, number, title }: SectionHeadingProps) {
  return (
    <div className={styles.heading}>
      <p className={styles.number} aria-hidden="true">
        {number}
      </p>
      <h2 className={styles.title} id={id}>
        {title}
      </h2>
    </div>
  );
}
