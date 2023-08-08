import { HTMLProps, ReactNode } from "react";
import styles from "./styles.module.scss";
interface Button extends HTMLProps<HTMLButtonElement> {
  children: ReactNode;
}

export function Button({ children }: Button) {
  return <button className={styles.container}>{children}</button>;
}
