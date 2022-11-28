import { localStorageKeys, USERS } from "../const";
import { lsSave } from "./localStorage";

export function setupMockupData() {
  lsSave(localStorageKeys.DB_USERS, USERS);
}
