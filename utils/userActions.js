import { child, get, getDatabase, ref } from "firebase/database";
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
