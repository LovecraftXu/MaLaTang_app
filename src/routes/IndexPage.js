import React from 'react';
import { connect } from 'dva';
import Login from './Login';
import styles from './IndexPage.css';

function IndexPage() {
  return (
    <div className={styles.normal}>
      <h1 className={styles.title}>欢迎使用洛夫克拉夫特·诩的毕设</h1>
      <div className={styles.login}>
         <Login />
      </div>
      <div className={styles.welcome} />
      <ul className={styles.list}>
        <li></li>
        <li></li>
      </ul>
    </div>
  );
}

IndexPage.propTypes = {
};

export default connect()(IndexPage);
