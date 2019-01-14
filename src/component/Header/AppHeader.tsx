import React, { Component } from 'react';
import styles from './index.css';
import classnames from 'classnames';

export default class AppHeader extends Component {
  render() {
    return (
      <div className={classnames(styles.appHeader)} >
        AppHeader
      </div>
    );
  }
}
