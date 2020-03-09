let mssql = require('mssql');
jsSHA = require("jssha");

const config = {
    user: 'detectives',
    password: 'neit2020',
    server: 'Sql.neit.edu',
    database: 'se425_food_detectives',
    port: 4500
};


/* GET home page. */
async function loginSQL(username, password) {
    this.username = username;
    this.password = password;
    let hashObj = new jsSHA("SHA-512", "TEXT", {numRounds: 1});
    hashObj.update(this.password);
    let hashPass = hashObj.getHash("HEX");
    let pool = await mssql.connect(config);
    let connector = async () => {
            return pool.request()
            .input('username', mssql.VarChar(30), this.username)
            .input('password', mssql.VarChar(30), hashPass)
            .execute('usp_Users_UserLogin')
    };
    return await connector();

}

async function registerSQL(
    username,
    password,
    firstName,
    lastName,
    emailAddress
                            ) {
    this.username = username;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
    this.emailAddress = emailAddress;
    let hashObj = new jsSHA("SHA-512", "TEXT", {numRounds: 1});
    hashObj.update(this.password);
    let hashPass = hashObj.getHash("HEX");
    let pool = await mssql.connect(config);
    let connector = async () => {
        return pool.request()
            .input('userName', mssql.VarChar(30), this.username)
            .input('password', mssql.VarChar(30), hashPass)
            .input('firstName', mssql.VarChar(30), this.firstName)
            .input('lastName', mssql.VarChar(30), this.lastName)
            .input('emailAddress', mssql.VarChar(30), this.emailAddress)
            .execute('usp_Users_CreateNewUser')
    };
    return await connector();
}

async function saveFavoriteSQL(
  userID,
  productID,
) {
    this.userID = userID;
    this.productID = productID;
    let pool = await mssql.connect(config);
    let connector = async () => {
        return pool.request()
          .input('userid', mssql.VarChar(255), this.userID)
          .input('favoritesSplitByComma', mssql.VarChar(50), this.productID)
          .execute('usp_Favorites_ModifyUserFavorites_ByUser')
    };
    return await connector();
}
module.exports = {
    config: config,
    login: loginSQL,
    register: registerSQL,
    saveFavorite: saveFavoriteSQL
};

