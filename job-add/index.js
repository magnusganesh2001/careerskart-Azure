const { addJob } = require("../utils/controllers/job");
const { checkAuth } = require("../utils/middleware/check-auth");

module.exports = async function (context, req) {
    console.log("info: job-add");
    console.log("info: job-add check auth");
    req = checkAuth(req);
    if (req.userData == null) {
        console.log("warn: job-add not authenticated");
        context.res = {
            status: 500,
            body: {
                message: "User not authenticated"
            }
        }
        return;
    }
    console.log("info: job-add check auth success");
    res = await addJob(req);
    if (res.status != 201)
        console.log("warn: job-add failed");
    else
        console.log("info: job-add successfull");
    context.res = res;
    return;
}