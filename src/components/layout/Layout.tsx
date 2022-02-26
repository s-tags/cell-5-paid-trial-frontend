import styles from './index.module.scss'

const Layout: React.FC<{}> = ({ children }) => {
  return <main className={styles.layout}>{children}</main>
}

export default Layout
