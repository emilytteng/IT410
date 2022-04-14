const accounts = require('../database/account')

module.exports = function(pool) {
    return {
        async createAccount (req, res) {
			// console.log("createAccount reached")
            const { username, password} = req.enforcer.body
            const userId = await accounts.createAccount(pool, username, password)
			// console.log("account created in db")

            if (userId) {
                res.set('location', '/api/accounts/' + userId)
                    .enforcer
                    .status(201)
                    .send()
            }
            else {
                res.enforcer.status(409).send()
            }
        },
        
        async modifyAccount (req, res) {
			// console.log("modifyAccount reached")
            const data = req.enforcer.body
			const { username } = req.enforcer.params
			const client = await pool.connect()

			try {
				await client.query('BEGIN')
				let account = await accounts.getAccountByUsername(client, username)
				// console.log("account found in db")

				if (account === undefined) {
					res.enforcer.status(404).send()
				}
                else if (account.userid !== req.user.id) {
					res.enforcer.status(401).send()
                } 
                else {
					await accounts.modifyAccount(client, username, data)
					// console.log("account modified in db")
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
        
        async deleteAccount (req, res) {
			// console.log("deleteAccount reached")
            const { username } = req.enforcer.params
			const client = await pool.connect()

			try {
				await client.query('BEGIN')
				let account = await accounts.getAccountByUsername(client, username)
				// console.log("account found in db")

				if (account === undefined) {
					res.enforcer.status(204).send()
				} 
                else if (account.userid !== req.user.id) {
					res.enforcer.status(403).send()
				}
                else {
					await accounts.deleteAccount(pool, username)
					// console.log("account deleted from db")
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

        async login (req, res) {},

        async logout (req, res) {}
    }
}
