// @flow
import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import DeleteDialog from './DeleteDialog';

import { Connection } from '../../types/connection';
import { DialogDeleteConnectionState } from '../../reducers/dialogDeleteConnection';
import ConnectionList from './ConnectionsList';

type Props = {
  addConnection: () => void,
  +connections: Array<Connection>,
  deleteConnectionClick: () => void,
  deleteDialog: DialogDeleteConnectionState
};

export default class Home extends Component<Props> {
  props: Props;

  render() {
    const { addConnection, connections, deleteDialog, deleteConnectionClick } = this.props;

    return (
      <Grid justify="center" container>
        <ConnectionList 
          addConnection={addConnection}
          connections={connections} 
          deleteConnectionClick={deleteConnectionClick}
        />
        <DeleteDialog { ...deleteDialog } />
      </Grid>
    );
  }
}
