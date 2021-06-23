import actionTypes from '../../constants/actionTypes';

const collectionReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.CHANGE_COLLECTION_LIST_CLIP:
      return {...state, collectionsList: action.payload};
    case actionTypes.CHANGE_CLIP_LIST:
      return {...state, clipsList: action.payload};
    case actionTypes.CHANGE_IS_MODAL_VISIBLE_CLIP:
      return {...state, isModalVisible: action.payload};
    case actionTypes.CHANGE_SELECTED_ITEM:
      return {...state, selectedItem: action.payload};
    case actionTypes.CHANGE_FAB_CLICKED:
      return {...state, fabClicked: action.payload};
    case actionTypes.CHANGE_MODAL_TYPE_CLIP:
      return {...state, modalType: action.payload};
    case actionTypes.CHANGE_IS_SUB_MODAL_VISIBLE_CLIP:
      return {...state, isSubModalVisible: action.payload};
    case actionTypes.CHANGE_EDIT_VALUE:
      return {...state, editValue: action.payload};
    case actionTypes.CHANGE_EDIT_COLLECTION_VALUE:
      return {...state, editCollectionValue: action.payload};
    case actionTypes.CHANGE_SHOW_LOADING_CLIP:
      return {...state, showLoading: action.payload};

    default:
      return state;
  }
};

export {collectionReducer};
