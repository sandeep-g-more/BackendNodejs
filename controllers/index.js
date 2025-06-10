import { User } from "../modules/users.js";


const handleGelUsers = async (req, res) => {
    // res.send('Hello, Express is working!');
    try {
        const users = await User.find({});
        res.json(users);
    }
    catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).send({ error: 'Failed to fetch users.' });
    }
}


const getUserById = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await User.findById(id)
        res.json(user);
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).send({ error: 'Failed to fetch user.' });
    }
}

const deleteUserById = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await User.findByIdAndDelete(id);
        if (!user) res.status(404).json({ error: "User not foundss" })
        res.json(user)
    } catch (err) {
        console.error('Error deleting user:', err);
        res.status('500').json({ error: err.message });
    }
}

const updateUserById = async (req, res) => {
    const id = req.params.id;
    try {
        const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true },);
        if (!updatedUser) res.status(404).json({ error: "User not found" })
        res.json(updatedUser)
    } catch (err) {
        res.status(400).json({ error: "err.message" })
    }
}

const createUser= async (req, res) => {
        console.log('req', req.body)
        const body = req.body;

        const result = new User({   
            firstName: body.firstName,
            lastName: body.lastName,
            email: body.email,
            job_title: body.job_title,
            gender: body.gender

        });
        if (!body.firstName || !body.lastName || !body.email || !body.job_title || !body.gender) {
            return res.status(400).send({ error: 'First name, last name, and email are required.' });
        }
        try {
            const user = new User(result);
            console.log('user', user)
            await user.save();
            res.status(201).send(user);
        } catch (error) {
            console.error('Error saving user:', error);
            res.status(500).send({ error: 'Failed to save user.' });
        }

    }
export { handleGelUsers, getUserById, deleteUserById,updateUserById,createUser };  // export the function to be used in other files