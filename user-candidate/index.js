const { getUserData } = require("../utils/controllers/user");

module.exports = async function (context, req) {
    console.log("info: candidate for "+req.body.email);
    req.params.id = context.bindingData.id;
    res = await getUserData(req);
    if (res.status != 200)
        console.log("warn: candidate failed "+req.body.email);
    else
        console.log("info: candidate successfull "+req.body.email);
    context.res = res;
    return;
}