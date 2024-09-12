import styles from "../styles/Header.module.css";

import Link from "next/link";
function Header() {
  return (
    <header>
      <Link href="/"><div className={styles.logo}></div></Link>
    </header>
  );
}
export default Header;