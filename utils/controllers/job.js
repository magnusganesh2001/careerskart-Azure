const Job = require("../models/job");
const Benefit = require("../models/job_benefit");
const Candidate = require("../models/job_candidate");
const Language = require("../models/job_language");
const Skill = require("../models/job_skill");
const User = require("../models/user");

exports.getJobs = async (req, res, next) => {
    try {
        const jobs = await Job.findAll({
            include: [
                { model: Benefit, attributes: { exclude: ["id", "jobId"] } },
                { model: Skill, attributes: { exclude: ["id", "jobId"] } },
                { model: Language, attributes: { exclude: ["id", "jobId"] } },
            ],
            plain: true
        });
        return {
            status: 201,
            body: {
                message: 'Jobs fetched successfully',
                jobs: jobs
            }
        };
    } catch (error) {
        return {
            status: 500,
            body: {
                message: 'Failed to fetch jobs',
                error: error
            }
        };
    }
}

exports.getJobsOfEmployer = async (req, res, next) => {
    try {
        console.log("ejsofhs");
        const jobs = await Job.findAll({
            where: { employer: req.userData.id },
            include: [
                { model: Benefit }, 
                { model: Skill }, 
                { model: Language }
            ]
        });
        console.log(jobs);
        return {
            status: 201,
            body: {
                message: 'Jobs fetched successfully',
                jobs: jobs
            }
        };
    } catch (error) {
        return {
            status: 500,
            body: {
                message: 'Failed to fetch jobs',
                error: error
            }
        };
    }
}

exports.addJob = async (req, res, next) => {
    try {
        const job = await Job.create({
            title: req.body.title,
            description: req.body.description,
            salary: req.body.salary,
            company: req.body.company,
            companyUrl: req.body.companyUrl,
            location: req.body.location,
            employer: req.body.employer,
            jobType: req.body.jobType,
            urgent: req.body.urgent,
        });
        let skills = [];
        req.body.skills.forEach(skill => {
            skills.push({
                skill: skill,
                jobId: job.id
            });
        });
        skills = await Skill.bulkCreate(skills);
        let languages = [];
        req.body.languages.forEach(language => {
            languages.push({
                language: language,
                jobId: job.id
            });
        });
        languages = await Language.bulkCreate(languages);

        let benefits = [];
        req.body.benefits.forEach(benefit => {
            benefits.push({
                benefit: benefit,
                jobId: job.id
            });
        });
        benefits = await Benefit.bulkCreate(benefits);

        const createdJob = await Job.findOne({
            where: { id: job.id },
            include: [
                { model: Skill },
                { model: Language },
                { model: Benefit }
            ],
            plain: true
        })
        return {
            status: 201,
            body: {
                message: 'Job added successfully',
                job: createdJob
            }
        };
    } catch (error) {
        return {
            status: 500,
            body: {
                message: 'Job failed to add!',
                error: error
            }
        };
    }
};

// exports.updateJob = (req, res, next) => {
//     const job = new Job(req.body);
//     Job.updateOne({ _id: job._id, employer: job.employer }, job).then(result => {
//         if (result.nModified > 0) {
//             return {
//                 status: 201,
//                 body: {
//                     message: 'Job data updated successfully!',
//                     job: job
//                 }
//             };
//         } else {
//             let oldJob;
//             Job.findById({ _id: job._id }).then(job => { oldJob = job; });
//             return {
//                 status: 200,
//                 body: {
//                     message: 'Job data not modified!',
//                     job: oldJob
//                 }
//             };
//         }
//     }).catch(error => {
//         let oldJob;
//         Job.findById({ _id: job._id }).then(job => { oldJob = job; });
//         return {
//             status: 500,
//             body: {
//                 message: 'Failed to update job data!',
//                 job: oldJob,
//                 error: error
//             }
//         };
//     });
//     return {
//         status: 500,
//         body: {
//             message: 'Failed to update job data!',
//             error: error
//         }
//     };
// };

exports.applyJob = async (req, res, next) => {
    try {
        const { jobId, candidateId } = req.body;
        let alreadyExists = await Candidate.findOne({
            where: { jobId: jobId, userId: candidateId }
        });
        let job = await Job.findOne({
            where: { id: jobId },
            include: [
                { model: Benefit, attributes: { exclude: ["id", "jobId"] } },
                { model: Skill, attributes: { exclude: ["id", "jobId"] } },
                { model: Language, attributes: { exclude: ["id", "jobId"] } },
            ],
            plain: true
        });
        if (alreadyExists != null)
            return {
                status: 500,
                body: {
                    message: 'Already applied!',
                }
            };

        await Candidate.create({
            jobId: jobId,
            userId: candidateId
        });
        const candidate_jobs = await Candidate.findAll({ where: { jobId: jobId } });
        let candidates = [];
        candidate_jobs.forEach(e => { candidates.push(e.userId); });
        console.log();
        return {
            status: 201,
            body: {
                message: 'Job updated successfully!',
                job: job,
                candidates: candidates
            }
        };
    } catch (error) {
        return {
            status: 500,
            body: {
                message: 'Job failed to update!',
                error: error
            }
        };
    }
};

const getCandidatesList = async (candidates, job) => {
    let c = [];
    candidates.forEach(ca => {
        c.push({
            id: ca.id,
            name: ca.name,
            email: ca.email,
            phone: ca.phone,
            resume: ca.resume,
            jobTitle: job.title,
            jobDesc: job.description,
            jobSalary: job.salary,
            jobType: job.jobType,
            jobSkills: job.skills,
            jobLanguages: job.languages,
        });
    });
    return c;
};

exports.getCandidates = async (req, res, next) => {
    try {
        const jobId = req.body.jobId;
        const job = await Job.findOne({
            where: { id: jobId },
            include: [
                { model: Benefit, attributes: { exclude: ["id", "jobId"] } },
                { model: Skill, attributes: { exclude: ["id", "jobId"] } },
                { model: Language, attributes: { exclude: ["id", "jobId"] } },
            ],
            plain: true
        });
        const job_candidates = await Candidate.findAll({ where: { jobId: 3 } });
        let candidateIds = [];
        job_candidates.forEach(e => { candidateIds.push(e.userId); });
        const candidates = await User.findAll({ where: { id: candidateIds } });
        const candidateList = await getCandidatesList(candidates, job);
        return {
            status: 200,
            body: {
                message: `Applied candidates fetched for job - ${jobId}!`,
                candidates: candidateList,
                jobId: jobId
            }
        };
    } catch (error) {
        return {
            status: 500,
            body: {
                message: 'Failed to retrieve candidates!',
                error: error
            }
        };
    }
};