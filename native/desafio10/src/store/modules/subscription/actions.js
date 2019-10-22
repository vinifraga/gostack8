export function indexRequest(isRefreshing = false) {
  return {
    type: '@subscription/INDEX_REQUEST',
    payload: {
      isRefreshing,
    },
  };
}

export function indexSuccess(subscriptions) {
  return {
    type: '@subscription/INDEX_SUCCESS',
    payload: { subscriptions },
  };
}

export function storeRequest(meetup_id) {
  return {
    type: '@subscription/STORE_REQUEST',
    payload: { meetup_id },
  };
}

export function storeSuccess(sub) {
  return {
    type: '@subscription/STORE_SUCCESS',
    payload: { sub },
  };
}

export function requestFailure() {
  return {
    type: '@subscription/REQUEST_FAILURE',
  };
}

export function deleteRequest(id) {
  return {
    type: '@subscription/DELETE_REQUEST',
    payload: { id },
  };
}

export function deleteSuccess(id) {
  return {
    type: '@subscription/DELETE_SUCCESS',
    payload: { id },
  };
}
