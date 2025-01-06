import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      {/* Left-aligned navigation links */}
      <div className={styles.navContainer}>
        <a href="/" className={styles.navLink}>StringTheoryThreads</a>

        {/* Dropdown for Shop */}
        <div className={styles.dropdown}>
          <button className={styles.dropbtn}>
            Shop
            <span className={styles.arrow}>^</span>
          </button>
          <div className={styles.dropdownContentBox}>
            <a href="/shop/new">New</a>
            <a href="/shop/all">All</a>
            <a href="/shop/shorts">Shorts</a>
            <a href="/shop/tees">Tees</a>
            <a href="/shop/accessories">Accessories</a>
            <a href="/shop/bottoms">Bottoms</a>
            <a href="/shop/headwear">Headwear</a>
            <a href="/shop/outerwear">Outerwear</a>
            <a href="/shop/sweats">Sweats</a>
            <a href="/shop/tops">Tops</a>
          </div>
        </div>

        <a href="/about" className={styles.navLink}>About</a>
      </div>

      {/* Right-aligned cart button */}
      <button className={styles.cartButton}>Cart</button>
    </header>
  );
}
