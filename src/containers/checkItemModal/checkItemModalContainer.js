import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'
import CheckItemModal from '../../components/checkItemModal/checkItemModalComponent'
// import { actions as sagaActions } from '../../redux/sagas/'
// import _ from 'lodash'
import { actionCreators } from '../../redux/reducers/checkItemModalReducer/checkItemModalReducerReducer'
// Global State
export function mapStateToProps (state, props) {
  return {
    checkItemData: state.checkItemModalReducer.checkItemData,
    modalSettings: state.checkItemModalReducer.modalSettings
  }
}
// In Object form, each funciton is automatically wrapped in a dispatch
export const propsMapping: Callbacks = {
  setModalSetting: actionCreators.setModalSetting,
  setCheckItemData: actionCreators.setCheckItemData
}

// If you want to use the function mapping
// export const propsMapping = (dispatch, ownProps) => {
//   return {
//     onClick: () => dispatch(actions.starsActions.FETCH_STARS)
//   }
// }
export default compose(
  connect(mapStateToProps, propsMapping),
  lifecycle({
    componentWillMount: function () {
        console.log('check Modal component will mount props', this.props)
    },
    componentDidMount: function () {
        console.log('component did mount')
    },
    componentWillReceiveProps: function (nextProps) {
        console.log('check Modal component will receive props', nextProps)
    }
  })
)(CheckItemModal)
