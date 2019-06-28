import reducer from "reducers/authReducer.js";
import { SET_CURRENT_USER, LOADING, REMOVE_CURRENT_USER } from "actions/types";

const initialState = {
  login: false,
  user: {},
  loading: false
};
describe("auth Reducer", () => {
  it("returns initial state", () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });
  describe("reducers action", () => {
    it("SET_CURRENT_USER", () => {
      let state;
      state = reducer(initialState, {
        type: SET_CURRENT_USER,
        payload: {
          id: "5cc8ab3915986b68a1a31710",
          iat: 1561739427,
          exp: 1593296353
        }
      });
      expect(state).toEqual({
        loading: false,
        login: true,
        user: {
          id: "5cc8ab3915986b68a1a31710",
          iat: 1561739427,
          exp: 1593296353
        }
      });
    });

    it("LOADING", () => {
      let state;
      state = reducer(initialState, {
        type: LOADING
      });
      expect(state.loading).toEqual(true);
    });
    it("REMOVE_CURRENT_USER", () => {
      let state;
      state = reducer(initialState, {
        type: REMOVE_CURRENT_USER
      });
      expect(state).toEqual({
        ...initialState
      });
    });
  });
});
