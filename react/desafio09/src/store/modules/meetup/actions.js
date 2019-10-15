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

export function storeRequest(title, description, location, banner_id, date) {
  return {
    type: '@meetup/STORE_REQUEST',
    payload: {
      title,
      description,
      location,
      banner_id,
      date,
    },
  };
}

export function storeSuccess(meetup) {
  return {
    type: '@meetup/STORE_SUCCESS',
    payload: { meetup },
  };
}

export function failure() {
  return {
    type: '@meetup/FAILURE',
  };
}

export function updateRequest(data) {
  return {
    type: '@meetup/UPDATE_REQUEST',
    payload: { data },
  };
}

export function updateSuccess(meetup) {
  return {
    type: '@meetup/UPDATE_SUCCESS',
    payload: { meetup },
  };
}
