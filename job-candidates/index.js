const { getCandidates } = require("../utils/controllers/job");
const { checkAuth } = require("../utils/middleware/check-auth");

module.exports = async function (context, req) {
    console.log("info: job-candidates");
    console.log("info: job-candidates check auth");
    req = await checkAuth(req);
    if (req.userData == null) {
        console.log("warn: job-candidates not authenticated");
        context.res = {
            status: 500,
            body: {
                message: "User not authenticated"
            }
        }
        return;
    }
    console.log("info: job-candidates check auth success");
    res = await getCandidates(req);
    if (res.status != 200)
        console.log("warn: job-candidates failed");
    else
        console.log("info: job-candidates successfull");
    context.res = res;
    return;
}