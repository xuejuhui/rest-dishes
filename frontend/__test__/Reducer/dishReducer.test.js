import reducer from "reducers/dishReducer.js";
import {
  GET_USER_DISHES,
  ADD_USER_DISHES,
  DELETE_USER_DISHES,
  GET_ALL_DISHES,
  ADD_USER_DISH_INGREDIENT,
  GET_DISH,
  SUBMIT_RATING
} from "actions/types";

const initialState = {
  userName: null,
  dishes: {},
  hasMore: true,
  dish: {},
  userDishes: {}
};

describe("dish Reducer", () => {
  it("returns initial state", () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });
  describe("reducers action", () => {
    it("GET_ALL_DISHES", () => {
      let state;
      state = reducer(initialState, {
        type: GET_ALL_DISHES,
        payload: [
          {
            date: "2019-06-24T16:37:41.428Z",
            description: "bad meat",
            dishName: "good meat",
            image: ["a265bea5-a9df-44fd-a166-0adadf8ce303+puppies.jpg"],
            ingredient: [],
            rating: [],
            url: [],
            user_id: { _id: "5cc8ab3915986b68a1a31710", email: "jay@jay.com" },
            __v: 0,
            _id: "5cc8ab3915986b68a1a31710"
          },
          {
            date: "2019-06-24T16:37:41.428Z",
            description: "bad meat",
            dishName: "good meat",
            image: ["a265bea5-a9df-44fd-a166-0adadf8ce303+puppies.jpg"],
            ingredient: [],
            rating: [],
            url: [],
            user_id: { _id: "5cc8ab3915986b68a1a31710", email: "jay@jay.com" },
            __v: 0,
            _id: "5d10fc55e564a801f8458818"
          }
        ]
      });
      expect(state).toEqual({
        ...initialState,
        dishes: {
          "5d10fc55e564a801f8458818": {
            date: "2019-06-24T16:37:41.428Z",
            description: "bad meat",
            dishName: "good meat",
            image: ["a265bea5-a9df-44fd-a166-0adadf8ce303+puppies.jpg"],
            avgRating: NaN,
            ingredient: [],
            rating: [],
            url: [],
            user_id: { _id: "5cc8ab3915986b68a1a31710", email: "jay@jay.com" },
            __v: 0,
            _id: "5d10fc55e564a801f8458818"
          },
          "5cc8ab3915986b68a1a31710": {
            date: "2019-06-24T16:37:41.428Z",
            description: "bad meat",
            dishName: "good meat",
            avgRating: NaN,
            image: ["a265bea5-a9df-44fd-a166-0adadf8ce303+puppies.jpg"],
            ingredient: [],
            rating: [],
            url: [],
            user_id: { _id: "5cc8ab3915986b68a1a31710", email: "jay@jay.com" },
            __v: 0,
            _id: "5cc8ab3915986b68a1a31710"
          }
        },
        hasMore: false
      });
    });
    it("HasMore", () => {
      let state;
      state = reducer(initialState, {
        type: GET_ALL_DISHES,
        payload: [
          { rating: [] },
          ,
          { rating: [] },
          ,
          { rating: [] },
          ,
          { rating: [] },
          ,
          { rating: [] },
          ,
          { rating: [] },
          ,
          { rating: [] },
          ,
          { rating: [] },
          ,
          { rating: [] },
          ,
          { rating: [] }
        ]
      });
      expect(state.hasMore).toEqual(true);
    });
    it("ADD_USER_DISHES", () => {
      let state;
      state = reducer(
        {
          ...initialState,
          dishes: {
            "1234567892": { _id: "1234567892", user_id: { _id: "12345" } }
          }
        },
        {
          type: ADD_USER_DISHES,
          payload: { _id: "123456789", user_id: "12345" }
        }
      );
      expect(state).toEqual({
        ...initialState,
        dishes: {
          "123456789": { _id: "123456789", user_id: { _id: "12345" } },
          "1234567892": { _id: "1234567892", user_id: { _id: "12345" } }
        }
      });
    });
    it("DELETE_USER_DISHES", () => {
      let state;
      state = reducer(
        {
          ...initialState,
          dishes: {
            "1234567892": { _id: "1234567892", user_id: { _id: "12345" } }
          }
        },
        {
          type: DELETE_USER_DISHES,
          payload: { id: "1234567892", user_id: "12345" }
        }
      );
      expect(state).toEqual(initialState);
    });
  });
});
