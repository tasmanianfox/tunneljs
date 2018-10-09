// @flow
import React, { Component } from 'react';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

import styles from './Home.css';
import Connection from './Connection';

export type ConnectionType = {
  local: NetworkNode,
  gate: NetworkNode,
  target: NetworkNode
};

type Props = {
  +connections: Array<ConnectionType>
};

function renderAddButton() {
  return (
    <Grid
      key="btnAdd"
      item
      className={styles.connectionBlock}
    >
      <Button variant="raised" fullWidth mini color="primary">
        <AddIcon />
        Add a new connection
      </Button>
    </Grid>
  );
}

export default class ConnectionsList extends Component<Props> {
  props: Props;

  render() {
    const { connections } = this.props;
    const connectionBlocks = connections.map((connection, index) => (
      <Connection key={index} {...connection} />
    ));
    connectionBlocks.push(renderAddButton());

    return (
      <Grid justify="center" xl={4} lg={6} md={6} sm={8} xs={12} item direction="column" container>
        {connectionBlocks}
      </Grid>
    );
  }
}
