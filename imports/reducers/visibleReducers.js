export const sidebarVisibleTab = (state = 'SEARCH', action) => {
  switch (action.type) {
    case 'CHANGE_SIDEBAR_TAB':
      return action.visibleTab;
    break;
    default:
      return state;
  }
}