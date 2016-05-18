
let testConf = {
    getDataServer: 'http://localhost/cubemaster_test/data.php',
    loginServer: 'http://localhost/cubemaster_test/login.php',
}

let customConf = {
    getDataServer: '/cubemaster/servlet/ExecutePageServlet',
    loginServer: '/cubemaster/servlet/LoginCheckServlet',
    loginOutServer: '/cubemaster/servlet/LogoutServlet'
}

export default customConf