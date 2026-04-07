import { removeRequest, setLoading, setRequests } from "@/features/friends";
import {
  acceptRequest,
  fetchRequests,
  rejectRequest,
} from "@/services/friends";

export const loadRequests = (userId) => async (dispatch) => {
  dispatch(setLoading(true));
  const data = await fetchRequests(userId);
  dispatch(setRequests(data));
  dispatch(setLoading(false));
};

export const handleAccept = (request) => async (dispatch) => {
  await acceptRequest(request);
  dispatch(removeRequest(request.id));
};

export const handleReject = (id) => async (dispatch) => {
  await rejectRequest(id);
  dispatch(removeRequest(id));
};
