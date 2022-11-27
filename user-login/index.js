const { userLogin } = require("../utils/controllers/user");

module.exports = async function (context, req) {
    console.log("info: Loggin in "+req.body.email);
    res = await userLogin(req);
    if (res.status != 200)
        console.log("warn: Login failed "+req.body.email);
    else
        console.log("info: Logged in successfully "+req.body.email);
    context.res = res;
    return;
}