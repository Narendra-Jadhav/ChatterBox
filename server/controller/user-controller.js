import User from "../model/User.js"

// backend -> to frontend => with response
// frontend -> to backend => with request

export const addUser = async (request, response) => {
    try {
        let exist = await User.findOne({ sub: request.body.sub });

        if (exist) {
            response.status(200).json({ msg: 'user already exists' });
            return;
        }

        const newUser = new User(request.body);
        await newUser.save();
        return response.status(200).json(newUser);
    } catch (error) {
        return response.status(500).json(error.message);
    }
}

export const getUsers = async (request, response) => {
    try {
        const users = await User.find({});
        return response.status(200).json(users);
    } catch (error) {
        // 500 -> internal server error
        return response.status(500).json(error.message);
    }
}