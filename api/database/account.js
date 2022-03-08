const bcrypt = require('bcryptjs')
const uuid = require('uuid').v4

exports.createAccount = async function (client, username, password) {
    const userId = uuid()
    const salt = await bcrypt.genSalt(10)
    const { rowCount } = await client.query({
        name: 'create-account',
        text: 'INSERT INTO accounts (userid, username, password) VALUES ($1, $2, $3) ON CONFLICT DO NOTHING',
        values: [
            userId,
            username,
            await bcrypt.hash(password, salt)	
        ]
    })
    return rowCount > 0 ? userId : undefined
}

exports.getAccountByUsername = async function (client, username) {
    const { rows } = await client.query({
        name: 'get-account-by-username',
        text: 'SELECT * FROM accounts WHERE username=$1',
        values: [username]
    })
    return rows[0]
}


exports.modifyAccount = async  function (client, username, data) {
    // create dynamic query based on inputs
    const { password } = data
    const values = []
    const sets = []
    
    if (password !== undefined) {
        const salt = await bcrypt.genSalt(10)
        const newPass = await bcrypt.hash(password, salt)
        values.push(newPass)
        sets.push('password=$' + values.length)
    }

    // if no properties were passed in then there is nothing to update
    if (values.length === 0) return await exports.getAccountByUsername(client, username)

    values.push(username)
    const { rows } = await client.query({
        name: 'update-account',
        text: 'UPDATE accounts SET ' + sets.join(', ') + ' WHERE username=$' + (values.length) + ' RETURNING *',
        values
    })
    return rows[0]
}

exports.deleteAccount = async function (client, username) {
    const { rowCount } = client.query({
        name: 'delete-account',
        text: 'DELETE FROM accounts WHERE username=$1',
        values: [username]
    })
    return rowCount > 0
}