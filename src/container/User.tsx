
import React, { Component } from 'react';
import { connect, Dispatch } from 'react-redux';
import { Stores } from '../store/index';
import { mergeProps } from '../common/config';

type Props = {};

type State = {};

class User extends Component<Props, State> {
  render() {
    return (
      <div>
        User
      </div>
    );
  }
}

const mapStateToProps = (state: Stores) => ({

});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(User);