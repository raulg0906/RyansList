const initialState = {
  categories: [],
  currentCategory: {},
  currentListings: [],
  currentListing: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case "GET_CATEGORIES":
      return { ...state, categories: action.payload };
    case "GET_CURRENT_CATEGORY":
      return { ...state, currentCategory: action.payload };
    case "GET_CURRENT_LISTINGS":
      return { ...state, currentListings: action.payload };
    case "GET_CURRENT_LISTING":
      return { ...state, currentListing: action.payload };
    default:
      return state;
  }
}
