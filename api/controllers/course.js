const courses = require('../database/course')

module.exports = function(pool) {
    return {
        async createCourse (req, res) { // POST /courses
            console.log("createCourse reached")
            const { courseName } = req.enforcer.body
            const courseId = await courses.createCourse(pool, req.user.id, courseName)
            console.log("course created in db")

            if (courseId) {
                res.set('location', '/api/courses/' + courseId)
                    .enforcer
                    .status(201)
                    .send()
            }
            else {
                res.enforcer.status(409).send()
            }

            // fail? 400?
        },

        async modifyCourse (req, res) { // PUT /courses/{courseId}
            console.log("modifyCourse reached")
            const data = req.enforcer.body
			const { courseId} = req.enforcer.params
			const client = await pool.connect()

            try {
                await client.query('BEGIN')
                let course = await courses.getCourseById(client, courseId)
                console.log("course found in db")

                if (course === undefined) {
                    res.enforcer.status(404).send()
                }
                else if (course.userid !== req.user.id) {
					res.enforcer.status(401).send()
                } 
                else {
                    await courses.modifyCourse(client, courseId, data)
                    console.log("course modified in db")
					res.enforcer.status(200).send()
                }
                // 400?
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

        async deleteCourse (req, res) { // DELETE /courses/{courseId}
            console.log("deleteCourse reached")
            const { courseId } = req.enforcer.params
			const client = await pool.connect()

            try {
                await client.query('BEGIN')
				let course = await courses.getCourseById(client, courseId)
				console.log("course found in db")

                if (course === undefined) {
					res.enforcer.status(204).send()
				} 
                else if (course.userid !== req.user.id) {
					res.enforcer.status(403).send()
				}
                else {
					await courses.deleteCourse(pool, courseId)
					console.log("course deleted from db")
					res.enforcer.status(204).send()
				}
                // 400 401?
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

        async getCourseList (req, res) { // GET /courses
            console.log("getCourseList reached")
            const courseList = await courses.getCourseList(pool, req.user.id)
            res.enforcer.status(200).send(courseList)
        }
    }
}