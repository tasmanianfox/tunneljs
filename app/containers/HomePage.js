// @flow
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Home from '../components/home/Home';
import * as HomeActions from '../actions/home';

function mapStateToProps(state) {
  return {
    connections: state.connections,
    deleteDialog: state.dialogDeleteConnection
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(HomeActions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);