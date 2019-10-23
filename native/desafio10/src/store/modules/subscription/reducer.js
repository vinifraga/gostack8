import { produce } from 'immer';
import { isAfter, parseISO } from 'date-fns';

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

        const index = draft.subscriptions.findIndex(item =>
          isAfter(parseISO(item.meetup.date), parseISO(sub.meetup.date))
        );

        if (index === -1) {
          draft.subscriptions.push(sub);
        } else {
          draft.subscriptions.splice(index, 0, sub);
        }

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
