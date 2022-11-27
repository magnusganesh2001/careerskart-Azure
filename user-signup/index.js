const { createUser } = require("../utils/controllers/user");

module.exports = async function (context, req) {
    console.log("info: signup for "+req.body.email);
    res = await createUser(req);
    if (res.status != 201)
        console.log("warn: signup failed "+req.body.email);
    else
        console.log("info: signup successfull "+req.body.email);
    context.res = res;
    return;
}