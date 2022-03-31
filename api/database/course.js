const uuid = require('uuid').v4

exports.createCourse = async function (client, userId, courseName) {
    const courseId = uuid();
    const { rowCount } = await client.query({
        name: 'create-course',
        text: 'INSERT INTO courses (userid, courseid, coursename) VALUES ($1, $2, $3) ON CONFLICT DO NOTHING',
        values: [
            userId,
            courseId,
            courseName
        ]
    })
    return rowCount > 0 ? userId : undefined
}

exports.getCourseById = async function (client, courseId) {
    const { rows } = await client.query({
        name: 'get-course-by-id',
        text: 'SELECT * FROM courses WHERE courseid=$1',
        values: [courseId]
    })
    return rows[0]
}

exports.modifyCourse = async function (client, courseId, data) {
    // create dynamic query based on inputs
    const { courseName } = data
    const values = []
    const sets = []
    
    if (courseName !== undefined) {
        values.push(courseName)
        sets.push('coursename=$' + values.length)
    }

    // if no properties were passed in then there is nothing to update
    if (values.length === 0) return await exports.getAccountByUsername(client, courseId)

    values.push(courseId)
    const { rows } = await client.query({
        name: 'update-course',
        text: 'UPDATE courses SET ' + sets.join(', ') + ' WHERE courseid=$' + (values.length) + ' RETURNING *',
        values
    })
    return rows[0]
}

exports.deleteCourse = async function (client, courseId) {
    const { rowCount } = await client.query({
        name: 'delete-course',
        text: 'DELETE FROM courses WHERE courseid=$1',
        values: [courseId]
    })
    return rowCount > 0
}

exports.getCourseList = async function (client, userId) {
    const { rows } = await client.query({
        name: 'get-course-list',
        text: 'SELECT courseid, coursename FROM courses WHERE userid=$1',
        values: [userId]
    })
    return rows
}
