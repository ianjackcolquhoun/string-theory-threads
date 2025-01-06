import Head from 'next/head';
import Header from '../components/Header';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>My eCommerce Site</title>
        <meta name="description" content="A simple eCommerce site built with Next.js" />
      </Head>
      
      <Header />
      
      <main className={styles.main}>
        <h1>Welcome to My eCommerce Store</h1>
        <p>Find the best products here.</p>
      </main>
    </div>
  );
}
