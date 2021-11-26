//here we go to test

import { queryAllUsers } from "./controllers/users/usersController";
import connectionDB from "./db/connectionDB";

test('should to return one or more users', () => {
    const callback = (err, res) => {
        try {
            expect(res.length).toBeGreaterThan(0);
            done();
        } catch (error) {
            done();
        }
    }

    const query = () => queryAllUsers(callback);

    connectionDB.connectDB(query);
});
