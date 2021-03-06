import ShopActionTypes from "./shop.types";

const INITIAL_STATE = {
  bicycles: null,
  isFetching: false,
  isDeleting: false,
  redirect: false,
  deleteMessage: false,
  errorMessage: undefined,
  toggleCarousel: true,
  locationId: [],
  manufacturerLabel: "",
  activeLink: "all",
};

const shopReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ShopActionTypes.FETCH_BICYCLES_START:
      return {
        ...state,
        isFetching: true,
      };
    case ShopActionTypes.FETCH_BICYCLES_SUCCESS:
      return {
        ...state,
        isFetching: false,
        bicycles: action.payload,
      };
    case ShopActionTypes.FETCH_BICYCLES_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload,
      };
    case ShopActionTypes.DELETE_BICYCLE_START:
      return {
        ...state,
        isDeleting: true,
      };
    case ShopActionTypes.DELETE_BICYCLE_SUCCESS:
      return {
        ...state,
        isDeleting: false,
        deleteMessage: true,
      };
    case ShopActionTypes.GET_DELETE_DEFAULT:
      return {
        ...state,
        deleteMessage: false,
        redirect: true,
      };
    case ShopActionTypes.GET_REDIRECT_DEFAULT:
      return {
        ...state,
        redirect: !state.redirect,
      };
    case ShopActionTypes.GET_MANUFACTURER_LABEL:
      return {
        ...state,
        manufacturerLabel: action.payload,
      };
    case ShopActionTypes.FILTER_BY_LOCATION:
      return {
        ...state,
        locationId: action.payload,
      };
    case ShopActionTypes.TOGGLE_CAROUSEL:
      return {
        ...state,
        toggleCarousel: !state.toggleCarousel,
      };
    case ShopActionTypes.UPDATE_LINK:
      return {
        ...state,
        activeLink: action.payload,
      };

    default:
      return state;
  }
};
export default shopReducer;
