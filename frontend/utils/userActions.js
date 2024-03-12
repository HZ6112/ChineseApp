import {
  child,
  endAt,
  get,
  getDatabase,
  orderByChild,
  query,
  ref,
  startAt,
} from "firebase/database";
import { Firebase_app } from "../firebase";

export const getUserData = async (userId) => {
  try {
    const app = Firebase_app;
    const dbRef = ref(getDatabase(app));
    const userRef = child(dbRef, `users/${userId}`);
    const snapshot = await get(userRef);
    return snapshot.val();
  } catch (error) {
    console.log(error);
  }
};
export const searchUsers = async (queryText) => {
  try {
    const app = Firebase_app;
    const dbRef = ref(getDatabase(app));
    const userRef = child(dbRef, `users`);
    const queryRef = query(
      userRef,
      orderByChild("name"),
      startAt(queryText),
      endAt(queryText + "\uf8ff")
    );
    const snapshot = await get(queryRef);
    if (snapshot.exists()) {
      return snapshot.val();
    }
    return {};
  } catch (error) {
    console.log(error);
    throw error;
  }
};
