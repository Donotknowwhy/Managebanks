import Head from 'next/head'
import styles from '../styles/Home.module.css'
import PrivateLayout from '../layouts/PrivateLayout';
export default function Home() {
  return (
    <PrivateLayout>
    <div className={styles.container}>
      index page
    </div>
    </PrivateLayout>
  )
}
