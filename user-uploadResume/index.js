const { uploadResume } = require("../utils/controllers/user");
const { checkAuth } = require("../utils/middleware/check-auth");

module.exports = async function (context, req) {
    console.log("info: upload-resume for "+req.body.email);
    console.log("info: upload-resume check auth");
    req = await checkAuth(req);
    if (req.userData == null) {
        console.log("warn: upload-resume not authenticated");
        context.res = {
            status: 500,
            body: {
                message: "User not authenticated"
            }
        }
        return;
    }
    console.log("info: upload-resume check auth success");
    res = await uploadResume(req);
    if (res.status != 200 || res.status != 201)
        console.log("warn: upload-resume failed "+req.body.email);
    else
        console.log("info: upload-resume successfull "+req.body.email);
    context.res = res;
    return;
}