const { getJobs } = require("../utils/controllers/job");

module.exports = async function (context, req) {
    console.log("info: job-all");
    res = await getJobs(req);
    if (res.status !== 201)
        console.log("warn: job-all failed ");
    else
        console.log("info: job-all successfull ");
    context.res = res;
    return;
}