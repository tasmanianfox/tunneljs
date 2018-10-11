// @flow

import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { Connection } from '../../types/connection'

export type Props = {
    connection: ?Connection,
    isOpen: boolean
    // onClose: () => {}
};

const renderNode = node => (
    <span>
        { node.host }{ node.port ? `:${node.port}` : '' }
    </span>
);

/**
 * Delete confirmation dialog
 */
class DeleteDialog extends Component<Props> {
    props: Props;

    renderContent() {
        const { isOpen, connection } = this.props;

        if (!isOpen) {
            return null;
        }

        return <DialogContentText id="alert-dialog-description">
            <strong>{ connection.name }</strong><br />
            <strong>From: { renderNode(connection.local) }</strong><br />
            <strong>Gate: { renderNode(connection.gate) }</strong><br />
            <strong>To: { renderNode(connection.target) }</strong><br />
        </DialogContentText>;
    }

    render() {
        const { isOpen } = this.props;

        return (
            <div>
                <Dialog
                    open={isOpen}
                    onClose={() => {}}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">Are you sure you want to delete this connection?</DialogTitle>
                    <DialogContent>
                        {this.renderContent()}
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                        No
                    </Button>
                    <Button onClick={this.handleClose} color="primary" autoFocus>
                        Yes
                    </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default DeleteDialog;