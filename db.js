const config = {
    user: 'detectives',
    password: 'neit2020',
    server: 'Sql.neit.edu',
    database: 'se425_food_detectives',
    port: 4500
};
const sql = require('mssql');

userLogin = (request, response, username, password) => {
    sql.connect(config).then(pool => {
        return pool.request()
        .input('username', sql.VarChar(30), username)
        .input('password', sql.VarChar(30), password)
        .execute('usp_Users_UserLogin')
    }).then(async result => {
        let results = await result;
        console.log(results)
        return results.recordset[0].userID;
        // if (results.output.returnValue === 1) {
        //     response.redirect('/preferences');
        // } else {
        //     console.log('error')
        // }
    }).catch(err => {
        return err;
    });
}

exports.userLogin = userLogin;
