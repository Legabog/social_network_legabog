import db from "utils/firebase/firebase";

const USERS_SET_USERS = "USERS_SET_USERS";

let initialState = {
  users: [],
  usersOnPage: null,
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case USERS_SET_USERS:
      return {
        ...state,
        users: [...state.users, { id: action.id, data: action.payload }],
      };

    default:
      return state;
  }
};

export const setUsers = (id, payload) => {
  return {
    type: USERS_SET_USERS,
    id,
    payload,
  };
};

export const firebaseSetUsers = () => {
  return (dispatch) => {
    db.collection("users_database")
      .orderBy("Email")
      .limit(3)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          dispatch(setUsers(doc.id, doc.data()));
        });
      });
  };
};

export default usersReducer;
