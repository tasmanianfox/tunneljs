// @flow
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Edit from '../components/edit/Edit';
import * as EditActions from '../actions/page_edit';

function mapStateToProps(state) {
  return {
    ...state.pageEdit
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(EditActions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Edit);