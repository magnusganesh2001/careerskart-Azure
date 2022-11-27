const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const UserLanguage = require("../models/user_language");
const UserSkill = require("../models/user_skill");
const UserTechnology = require("../models/user_technology");

const JWT_KEY = process.env['JWT_KEY'];
const FILE_UPLOAD_ENDPOINT = process.env['FILE_UPLOAD_ENDPOINT'];

exports.createUser = async (req, res, next) => {
    try {
        const hash = await bcrypt.hash(req.body.password, 10)
        const user = new User({
            name: req.body.name,
            company: req.body.company,
            companyUrl: req.body.companyUrl,
            phone: req.body.phone,
            email: req.body.email,
            password: hash,
            location: req.body.location,
            type: req.body.type,
        });
        try {
            await user.save();
            return {
                status: 201,
                body: {
                    message: "User created!",
                }
            };
        } catch (error) {
            return {
                status: 500,
                body: {
                    message: "User already exists!",
                }
            };
        }
    } catch (error) {
        return {
            status: 500,
            body: {
                message: "Internal server error!\nPlease try again later!",
            }
        };
    }
};

exports.userLogin = async (req) => {
    try {
        // await SQLize.sync();
        let fetchedUser = (await User.findOne({
            where: { email: req.body.email },
            include: [
                { model: UserSkill },
                { model: UserLanguage },
                { model: UserTechnology }
            ]
        })).toJSON();
        if (fetchedUser == null)
        return {
            status: 401,
            body: {
                message: "User not found!",
            }
        };
        const authenticated = await bcrypt.compare(req.body.password, fetchedUser.password);
        if (!authenticated)
            return {
                status: 401,
                body: {
                    message: "Invalid authentication credentials",
                }
            };
        delete fetchedUser['password'];
        console.log(fetchedUser);
        let userData = {
            'id': fetchedUser.id,
            'name': fetchedUser.name,
            'company': fetchedUser.company,
            'companyUrl': fetchedUser.companyUrl,
            'phone': fetchedUser.phone,
            'email': fetchedUser.email,
            'type': fetchedUser.type,
            'resume': fetchedUser.resume,
            'location': fetchedUser.location,
            'languagesKnown': fetchedUser.user_languages,
            'skills': fetchedUser.user_skills,
            'technologies': fetchedUser.user_technologies,
        };
        const token = jwt.sign({
            'id': String(fetchedUser.id),
            'email': String(fetchedUser.email)
        }, JWT_KEY, { expiresIn: "3d" });
        return {
            status: 200,
            body: {
                'token': token,
                'id': fetchedUser.id,
                'name': fetchedUser.name,
                'email': fetchedUser.email,
                'type': fetchedUser.type,
                'expiresIn': "3d",
                userData,
            }
        };

    } catch (error) {
        return {
            status: 500,
            body: {
                message: "Internal Server Error",
                error
            }
        };
    }
};

exports.getUserData = async (req, res, next) => {
    try {
        const user = await User.findOne({
            where: { id: req.params.id },
            include: [
                { model: UserSkill },
                { model: UserLanguage },
                { model: UserTechnology }
            ]
        });
        if (user != null)
            return {
                status: 200,
                body: {
                    message: "User Data fetched successfully",
                    user: {
                        'id': user.id,
                        'name': user.name,
                        'email': user.email,
                        'phone': user.phone,
                        'location': user.location,
                        'resume': user.resume,
                        'languagesKnown': user.user_languages,
                        'skills': user.user_skills,
                        'technologies': user.user_technologies,
                    }
                }
            };
        else
            throw new Error();
    } catch (error) {
        return {
            status: 500,
            body: {
                message: "No such user exists!",
            }
        };
    }
};

exports.uploadResume = async (req, res, next) => {
    if (!req.file)
        return {
            status: 500,
            body: {
                message: "Upload failed!\nFile not found!",
            }
        };
    let user = await User.findById(req.userData.id);
    user.resume = FILE_UPLOAD_ENDPOINT + "resumes/" + req.file.filename;
    user.save()
        .then((user) => {
            console.log(user);
            return {
                status: 201,
                body: {
                    message: "Resume uploaded successfully!",
                    user: user
                }
            };
        })
        .catch((err) => {
            return {
                status: 500,
                body: {
                    message: "Failed to upload resume.\nPlease try again...",
                }
            };
        });
    return {
        status: 500,
        body: {
            message: "Failed to upload resume.\nPlease try again...",
        }
    };
};