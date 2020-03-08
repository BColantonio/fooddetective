let mssql = require('mssql');
const config = {
    user: 'detectives',
    password: 'neit2020',
    server: 'Sql.neit.edu',
    database: 'se425_food_detectives',
    port: 4500
};
// const pool1 = new mssql.ConnectionPool(config);
// const pool1Connect = pool1.connect();
// pool1.on('error', err => {
//     console.log(err);
// });
//
// let initialConnectSQL = async () => {
//     await pool1Connect;
//     try {
//         const request = pool1.connect((error) => {console.log(error)});
//         const result = await request;
//         console.dir(result);
//         return result
//     } catch (err) {
//         console.error('SQL error', err);
//     }
// };
// //
// let finalDisconnectSQL = async () => {
//     await initialConnect;
//     try {
//         // make sure that any items are correctly URL encoded in the connection string
//         const request = pool1.close((result) => {console.log(result)});
//         const result = await request;        // const result = await sql.query`select * from mytable where id = ${value}`
//         console.dir(result)
//     } catch (err) {
//         console.error('SQL error', err);
//     }
// };
//
/* GET home page. */
async function loginSQL(username, password) {
    this.username = username;
    this.password = password;
    let pool = await mssql.connect(config)
    let connecter = async () => {
            return pool.request()
            .input('username', mssql.VarChar(30), this.username)
            .input('password', mssql.VarChar(30), this.password)
            .execute('usp_Users_UserLogin')
    };
    return await connecter();

}

    // var results;
    // var username = req.body.username;
    // var password = req.body.password;
    // sql.connect(db).then(pool => {
    //     return pool.request()
    //         .input('username', sql.VarChar(30), username)
    //         .input('password', sql.VarChar(30), password)
    //         .output('returnValue', sql.VarChar(50))
    //         .execute('usp_Users_UserLogin')
    // }).then(result => {
    //     //console.log(result)
    //     results = result;
    //     // console.log(results)
    //     if (result.output.returnValue == 1) {
    //         res.redirect('/preferences');
    //     } else {
    //         console.log('error')
    //     }
    // }).catch(err => {
    //     console.log(err)
    // })
//
// });
module.exports = {
    config: config,
    login: loginSQL
};

