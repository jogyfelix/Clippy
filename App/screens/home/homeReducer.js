import actionTypes from '../../constants/actionTypes';

const homeReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.CHANGE_COLLECTION_COUNT:
      return {...state, collectionCount: action.payload};
    case actionTypes.CHANGE_IS_MODAL_VISIBLE:
      return {...state, isModalVisible: action.payload};
    case actionTypes.CHANGE_IS_SUB_MODAL_VISIBLE:
      return {...state, isSubModalVisible: action.payload};
    case actionTypes.CHANGE_COLLECTION_LIST:
      return {...state, collectionsList: action.payload};
    case actionTypes.CHANGE_MODAL_TYPE:
      return {...state, modalType: action.payload};
    case actionTypes.CHANGE_SHOW_LOADING:
      return {...state, showLoading: action.payload};

    default:
      return state;
  }
};

export {homeReducer};
