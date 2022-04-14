const uuid = require('uuid').v4

exports.createAssignment = async function (client, courseId, asgmtName, dueDate) {
    const asgmtId = uuid();
    const completed = false;
    const { rowCount } = await client.query({
        name: 'create-assignment',
        text: 'INSERT INTO assignments (asgmtid, courseid, asgmtname, duedate, completed) VALUES ($1, $2, $3, $4, $5) ON CONFLICT DO NOTHING',
        values: [
            asgmtId,
            courseId,
            asgmtName,
            dueDate,
            completed
        ]
    })
    return rowCount > 0 ? asgmtId : undefined
}

exports.modifyAssignment = async function (client, asgmtId, data) {
    // create dynamic query based on inputs
    const { completed } = data
    const values = []
    const sets = []

    if (completed !== undefined) {
        values.push(completed)
        sets.push('completed=$' + values.length)
    }

    // if no properties were passed in then there is nothing to update
    if (values.length === 0) return await exports.getAssignmentById(client, asgmtId)

    values.push(asgmtId)
    const { rows } = await client.query({
        name: 'update-assignment',
        text: 'UPDATE assignments SET ' + sets.join(', ') + ' WHERE asgmtid=$' + (values.length) + ' RETURNING *',
        values
    })
    return rows[0]
}

exports.deleteAssignment = async function (client, asgmtId) {
    const { rowCount } = await client.query({
        name: 'delete-assignment',
        text: 'DELETE FROM assignments WHERE asgmtid=$1',
        values: [asgmtId]
    })
    return rowCount > 0
}

exports.getAssignmentById = async function (client, asgmtId) {
    const { rows } = await client.query({
        name: 'get-assignment-by-id',
        text: 'SELECT * FROM assignments WHERE asgmtid=$1',
        values: [asgmtId]
    })
    return rows[0]
}

exports.getCourseAssignments = async function (client, courseId) {
    const { rows } = await client.query({
        name: 'get-course-assignments',
        text: 'SELECT * FROM assignments WHERE courseid=$1',
        values: [courseId]
    })
    return rows
}