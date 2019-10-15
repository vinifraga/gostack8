import { produce } from 'immer';

const INITIAL_STATE = {
  meetups: [],
  loading: false,
};

export default function meetup(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@meetup/INDEX_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@meetup/STORE_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@meetup/UPDATE_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@meetup/INDEX_SUCCESS': {
        draft.meetups = action.payload.meetups;
        draft.loading = false;
        break;
      }
      case '@meetup/STORE_SUCCESS': {
        draft.loading = false;
        break;
      }
      case '@meetup/UPDATE_SUCCESS': {
        draft.loading = false;
        break;
      }
      case '@meetup/FAILURE': {
        draft.loading = false;
        break;
      }
      default:
    }
  });
}
