const assignments = require('../database/assignment')
const courses = require('../database/course')

module.exports = function(pool) {
    return {
        // POST /courses/{courseId}
        async createAssignment (req, res) { 
            // console.log("createAssignment reached")
            const { asgmtName, dueDate} = req.enforcer.body
            const { courseId} = req.enforcer.params
            const asgmtId = await assignments.createAssignment(pool, courseId, asgmtName, dueDate)
            // console.log("assignment created in db")

            if (asgmtId) {
                res
                    .enforcer
                    .status(201)
                    .send()
            }
            else {
                res.enforcer.status(409).send()
            }
        },

        // PUT /courses/{courseId}/{asgmtId}
        async modifyAssignment (req, res) { 
            // console.log("modifyAssignment reached")
            const data = req.enforcer.body
			const { courseId, asgmtId} = req.enforcer.params
			const client = await pool.connect()

            try {
                await client.query('BEGIN')
                let course = await courses.getCourseById(client, courseId)
                let assignment = await assignments.getAssignmentById(client, asgmtId)
                // console.log("assignment found in db")

                if (assignment === undefined) {
                    res.enforcer.status(404).send()
                }
                else if (course.userid !== req.user.id) {
					res.enforcer.status(401).send()
                } 
                else {
                    await assignments.modifyAssignment(client, asgmtId, data)
                    // console.log("assignment modified in db")
					res.enforcer.status(200).send()
                }
                await client.query('COMMIT')
            }
            catch (e) {
                await client.query('ROLLBACK')
				throw e
			} 
            finally {
				client.release()
			}
        },

        // DELETE /courses/{courseId}/{asgmtId}
        async deleteAssignment (req, res) { 
            // console.log("deleteAssignment reached")
            const { courseId, asgmtId } = req.enforcer.params
			const client = await pool.connect()

            try {
                await client.query('BEGIN')
                let course = await courses.getCourseById(client, courseId)
                let assignment = await assignments.getAssignmentById(client, asgmtId)
                // console.log("assignment found in db")

                if (assignment === undefined) {
					res.enforcer.status(204).send()
				} 
                else if (course.userid !== req.user.id) {
					res.enforcer.status(403).send()
				}
                else {
					await assignments.deleteAssignment(pool, asgmtId)
					// console.log("assignment deleted from db")
					res.enforcer.status(204).send()
				}
				await client.query('COMMIT')
            }
            catch (e) {
				await client.query('ROLLBACK')
				throw e
			} 
            finally {
				client.release()
			}
        },

        // GET /courses/{courseId}
        async getCourseAssignments (req, res) { 
            // console.log("getCourseAssignments reached")
            const { courseId } = req.enforcer.params
            const assignmentList = await assignments.getCourseAssignments(pool, courseId)
            if (assignmentList) {
                res.enforcer.status(200).send(assignmentList)
            }
            else {
                // console.log("no assignments")
                res.enforcer.status(400)
            }
        }
    }
}