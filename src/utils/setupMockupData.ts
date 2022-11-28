import { USERS } from '../const';
import { lsSave } from './localStorage';

export function setupMockupData() {
    lsSave('db_users', USERS);
}
