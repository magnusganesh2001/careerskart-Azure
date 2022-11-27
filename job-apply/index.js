const { applyJob } = require("../utils/controllers/job");
const { checkAuth } = require("../utils/middleware/check-auth");

module.exports = async function (context, req) {
    console.log("info: job-apply");
    console.log("info: job-apply check auth");
    req = await checkAuth(req);
    if (req.userData == null) {
        console.log("warn: job-apply not authenticated");
        context.res = {
            status: 500,
            body: {
                message: "User not authenticated"
            }
        }
        return;
    }
    console.log("info: job-apply check auth success");
    res = await applyJob(req);
    if (res.status != 201)
        console.log("warn: job-apply failed");
    else
        console.log("info: job-apply successfull");
    context.res = res;
    return;
}