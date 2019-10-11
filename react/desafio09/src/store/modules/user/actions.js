export function updateRequest(data) {
  return {
    type: '@user/UPDATE_REQUEST',
    payload: {
      data,
    },
  };
}

export function updateSuccess(profile) {
  return {
    type: '@user/UPDATE_SUCCESS',
    payload: {
      profile,
    },
  };
}

export function updateFailure() {
  return {
    type: '@user/UPDATE_FAILURE',
  };
}
