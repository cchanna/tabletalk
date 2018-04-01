const SET_COLLAPSED = "CHATBOX_SET_COLLAPSED";

export const actions = {
  setChatboxCollapsed: [SET_COLLAPSED, "collapsed"]
};

export const reducer = (state = true, action) => {
  switch(action.type) {
    case SET_COLLAPSED:
      return action.collapsed;
    default:
      return state;  
  }
};


const getIsChatboxCollapsed = state => state;

export const selectors = { getIsChatboxCollapsed };
