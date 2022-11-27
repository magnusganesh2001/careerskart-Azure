const { getJobsOfEmployer } = require("../utils/controllers/job");
const { checkAuth } = require("../utils/middleware/check-auth");

module.exports = async function (context, req) {
    console.log("info: employer");
    console.log("info: employer check auth");
    req = await checkAuth(req);
    if (req.userData == null) {
        console.log("warn: employer not authenticated");
        context.res = {
            status: 500,
            body: {
                message: "User not authenticated"
            }
        }
        return;
    }
    console.log("info: employer check auth success");
    res = await getJobsOfEmployer(req);
    if (res.status != 201)
        console.log("warn: employer failed");
    else
        console.log("info: employer successfull");
    context.res = res;
    return;
}