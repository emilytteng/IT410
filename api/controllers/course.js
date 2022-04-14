const courses = require('../database/course')

module.exports = function(pool) {
    return {
        // POST /courses
        async createCourse (req, res) { 
            // console.log("createCourse reached")
            const { courseName } = req.enforcer.body
            const courseId = await courses.createCourse(pool, req.user.id, courseName)
            // console.log("course created in db")

            if (courseId) {
                res.set('location', '/api/courses/' + courseId)
                    .enforcer
                    .status(201)
                    .send()
            }
            else {
                res.enforcer.status(409).send()
            }
        },

        // PUT /courses/{courseId}
        async modifyCourse (req, res) { 
            // console.log("modifyCourse reached")
            const data = req.enforcer.body
			const { courseId} = req.enforcer.params
			const client = await pool.connect()

            try {
                await client.query('BEGIN')
                let course = await courses.getCourseById(client, courseId)
                // console.log("course found in db")

                if (course === undefined) {
                    res.enforcer.status(404).send()
                }
                else if (course.userid !== req.user.id) {
					res.enforcer.status(401).send()
                } 
                else {
                    await courses.modifyCourse(client, courseId, data)
                    // console.log("course modified in db")
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

        // DELETE /courses/{courseId}
        async deleteCourse (req, res) { 
            // console.log("deleteCourse reached")
            const { courseId } = req.enforcer.params
			const client = await pool.connect()

            try {
                await client.query('BEGIN')
				let course = await courses.getCourseById(client, courseId)
				// console.log("course found in db")

                if (course === undefined) {
					res.enforcer.status(204).send()
				} 
                else if (course.userid !== req.user.id) {
					res.enforcer.status(403).send()
				}
                else {
					await courses.deleteCourse(pool, courseId)
					// console.log("course deleted from db")
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

        // GET /courses
        async getCourseList (req, res) { 
            // console.log("getCourseList reached")
            const courseList = await courses.getCourseList(pool, req.user.id)
            if (courseList) {
                res.enforcer.status(200).send(courseList)
            }
            else {
                // console.log("no courses")
                res.enforcer.status(400)
            }
        }
    }
}