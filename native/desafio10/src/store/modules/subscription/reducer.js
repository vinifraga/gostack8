import { produce } from 'immer';

const INITIAL_STATE = {
  subscriptions: [],
  loading: true,
  refreshing: false,
  buttonLoading: false,
};

export default function subscription(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@subscription/INDEX_REQUEST': {
        const { isRefreshing } = action.payload;

        if (isRefreshing) {
          draft.refreshing = true;
        } else {
          draft.loading = true;
        }

        break;
      }
      case '@subscription/INDEX_SUCCESS': {
        const { subscriptions } = action.payload;

        draft.subscriptions = subscriptions;

        if (draft.refreshing) {
          draft.refreshing = false;
        } else {
          draft.loading = false;
        }

        break;
      }
      case '@subscription/STORE_REQUEST': {
        draft.buttonLoading = true;

        break;
      }
      case '@subscription/STORE_SUCCESS': {
        const { sub } = action.payload;

        draft.subscriptions.push(sub);
        draft.buttonLoading = false;

        break;
      }
      case '@subscription/DELETE_REQUEST': {
        draft.buttonLoading = true;

        break;
      }
      case '@subscription/DELETE_SUCCESS': {
        const { id } = action.payload;

        draft.subscriptions = draft.subscriptions.filter(
          item => item.id !== id
        );
        draft.buttonLoading = false;

        break;
      }
      case '@subscription/REQUEST_FAILURE': {
        draft.loading = false;
        draft.refreshing = false;
        draft.buttonLoading = false;

        break;
      }
      default:
    }
  });
}
