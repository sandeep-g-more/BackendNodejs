
    import express from 'express';
    import { User } from '../modules/users.js';
import { createUser, deleteUserById, getUserById, handleGelUsers, updateUserById } from '../controllers/index.js';
    const router = express.Router();

    router.route('/').post(createUser).get(handleGelUsers)
    router.route('/:id').get(getUserById).put(updateUserById).delete(deleteUserById)

    // get all users
    // router.get('/', handleGelUsers);
 
    // get one user by id


    // delete user by id
    // router.delete('/:id',deleteUserById)


    // // update 
    // router.put('/:id',updateUserById)

    export default router;