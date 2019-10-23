import produce from 'immer';

const INITIAL_STATE = {
  profile: null,
  loading: false,
};

export default function user(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@auth/SIGN_IN_SUCCESS': {
        const { user: profile } = action.payload;

        draft.profile = profile;

        break;
      }
      case '@auth/SIGN_OUT': {
        draft.profile = null;

        break;
      }
      case '@user/UPDATE_REQUEST': {
        draft.loading = true;

        break;
      }
      case '@user/UPDATE_SUCCESS': {
        const { profile } = action.payload;

        draft.profile = profile;
        draft.loading = false;

        break;
      }
      case '@user/UPDATE_FAILURE': {
        draft.loading = false;

        break;
      }
      default:
    }
  });
}
