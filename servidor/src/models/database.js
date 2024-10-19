const { Sequelize } = require("sequelize");

// Configuration for PostgreSQL connection
const config = {
  database: "defaultdb", // Change this to your actual database name
  username: "avnadmin",
  password: "AVNS_HiPJu3hFbUcmfljhHn7",
  host: "hackatl-hackatl.k.aivencloud.com",
  port: 16969,
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      rejectUnauthorized: true,
      ca: `-----BEGIN CERTIFICATE-----
MIIEQTCCAqmgAwIBAgIUI/llSm0IIjJscuZJqIEKamC+cj8wDQYJKoZIhvcNAQEM
BQAwOjE4MDYGA1UEAwwvNDliZmE4NWEtZTZlYS00ZmViLTg0NTMtNWUxN2Y0ZGE1
YmQ3IFByb2plY3QgQ0EwHhcNMjQxMDE5MjAxNjUzWhcNMzQxMDE3MjAxNjUzWjA6
MTgwNgYDVQQDDC80OWJmYTg1YS1lNmVhLTRmZWItODQ1My01ZTE3ZjRkYTViZDcg
UHJvamVjdCBDQTCCAaIwDQYJKoZIhvcNAQEBBQADggGPADCCAYoCggGBAONm746G
pwaZh3tfHFVxmbitXHL4oAiN8ExObHHupa5NDbqCMkOVH8eQQIbsi5RDWfCfzwsm
5sUVV6KKQ2sRiCj/rxL5etNHRbh4iXYzNshjixsVxSmDkMLkVHT+QeFUu5+uV2Cw
gNC5tmuXRcjWqDDwGA6C5n6pcMltclNXua8DWLN+VN7VuVsmlm9g8JKn6VOZxmIQ
F2A/bBU75lEBFX2nCRn6vYTpE7/mHTZCXJ4HQ7bvZZeJKTItMyJNzYJ//pqn0KpV
XNHfaCMz/MZ4OJydpdjtPr7EXG8/i2uCOjTOUGCraBdb0+Q5RUqbe+3Zte12ZA81
dRQT8yQ/Vu4ui48V9MIQRJo4rL0PqfPPYBK3jxXWF/RVPLnDzEmEmpELDV+Ljlly
b/G1bHuHWodrtV6lSDIkXPGs/nQSvmu0yDUVcEscC+9ch5zVWT731y/MCiK+poq2
DVXgCM9NlZyuIQ6+3CPEeGVmtMAfcHwCYYos8N/UdEfw8x4/FYoMR7NhOQIDAQAB
oz8wPTAdBgNVHQ4EFgQUmcak4VSINa/bnSVTqkUSqy1egUUwDwYDVR0TBAgwBgEB
/wIBADALBgNVHQ8EBAMCAQYwDQYJKoZIhvcNAQEMBQADggGBACSt9MQ65Fykm1Bo
6EHsDgxYroime2eKdHndcHbcwjmGgZCqKNEpFsx/0eX4HwG3CnVNXglUhZvW/Cna
a90y209JZhNoNpBcq94kEUaJnPLCKu+m3nxja2/VOp4yXcQ9YQJTl5nnUomJ87qB
3Nm86y6SNStcL763Np2SEM0DKYgDDFdXS0KoLwCMJ2OlsfJTkKQa5tHJ3PWBMWaw
lEsBr0gDh3fGfMx4Yjk6oUIfjI/x+VIL7EQPC52DdmvN7bQ0uv/C+5h1fz5t/67V
PMnSamQDXn/Mo8PQTbCMrbWunPg4eFs3dCYi2amG73fS7Z/yaeRcFNLxJ9ni9s3v
m5cek404u+konksHXhIRFAEGySAoizQAg4Bd7PBedrGHzAy2bpZV/0s+X7LUhn2p
PiSWAm+LfD+D/MLQvDzyGQQAjGuKQy3uXvxyenjomfT/Wz0f2hTiiSATGYUe3pzV
69g3UrWy7OiSQoqO3zXynGpHR+7mIpk76GgJGsqorK1C2A0UcA==
-----END CERTIFICATE-----`,
    },
  },
};

// Create a new Sequelize instance
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    port: config.port,
    dialect: config.dialect,
    dialectOptions: config.dialectOptions,
  }
);

// Test the connection
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

module.exports = sequelize; // Export the sequelize instance
