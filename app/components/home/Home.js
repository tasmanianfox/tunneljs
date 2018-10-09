// @flow
import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';

import ConnectionList from './ConnectionsList';

export type Connection = {
  local: NetworkNode,
  gate: NetworkNode,
  target: NetworkNode
};

type Props = {
  +connections: Array<Connection>
};

export default class Home extends Component<Props> {
  props: Props;

  render() {
    return (
      <Grid justify="center" container>
        <ConnectionList {...this.props} />
      </Grid>
    );
  }
}
