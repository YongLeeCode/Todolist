import styles from "../styles/Header.module.css";

import Link from "next/link";
function Header() {
  return (
    <div>
      <Link href="/"><div className={styles.logo}></div></Link>
    </div>
  );
}
export default Header;