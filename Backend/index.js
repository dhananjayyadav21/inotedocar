const conectTomongo = require("./Db");
const express = require("express");
var cors = require('cors')
require('dotenv').config();
conectTomongo();

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.use("/api/auth/", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

// app.listen(port, () => {
//   console.log(authSecreatekey)
//   console.log(dbUrl)
//   console.log(`inotebook app listening on port ${port}`);
// });

app.listen(5000, "192.168.0.105");
