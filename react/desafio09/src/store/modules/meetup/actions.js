export function indexRequest() {
  return {
    type: '@meetup/INDEX_REQUEST',
  };
}

export function indexSuccess(meetups) {
  return {
    type: '@meetup/INDEX_SUCCESS',
    payload: { meetups },
  };
}

export function storeRequest(data) {
  return {
    type: '@meetup/STORE_REQUEST',
    payload: {
      data,
    },
  };
}

export function storeSuccess() {
  return {
    type: '@meetup/STORE_SUCCESS',
  };
}

export function failure() {
  return {
    type: '@meetup/FAILURE',
  };
}

export function updateRequest(id, data) {
  return {
    type: '@meetup/UPDATE_REQUEST',
    payload: { id, data },
  };
}

export function updateSuccess() {
  return {
    type: '@meetup/UPDATE_SUCCESS',
  };
}
