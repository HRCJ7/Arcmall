const defaultState = {
  clickApproved: false
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case "APPROVAL":
      return Object.assign({}, state, {
        clickApproved: true
      });
    default:
      return state;
  }
}
