const express = require("express"),
    fs = require("fs"),
    url = require("url");
const app = express();
const mysql2 = require("mysql2");
const cors = require("cors");
let bodyParser = require("body-parser");
const { Session } = require("inspector/promises");
const PORT = process.env.PORT || 5000;
const session = require("express-session");
const cookieParser = require("cookie-parser");


app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser("secret"));
app.use(express.static("public"));
app.use(session({
    secret: "secret",
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 30 * 24 * 60 * 60 * 1000
    }
}));

const connection = mysql2.createConnection({
    host: "WINDOWS-3PN1LIC",
    user: "new_user",
    password: "password",
    database: "shop_items",
    port: 3306,
    keepAliveInitialDelay: 10000,
    enableKeepAlive: true,
})



app.get("/", (req, res) => {
    req.session.destroy
    res.redirect("/login");
})

app.get("/cookie", (req, res) => {
    res.send(req.session)
})

/*User authorization*/
app.post("/isuser", (req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    try {
        connection.connect();
        connection.query(`select * from users where username = "${username}"`, (err, result) => {
            if (result.length < 1) {
                res.redirect("/login");
            }
            else {
                if (result[0].password === password) {
                    req.session.user = { username: username, profilePic: result[0].profileId, password: password, loggedIn: "True" };
                    res.status(200);
                    res.redirect(`/profile/${username}`)
                }
                else {
                    res.redirect("/login");
                }
            }
            if (err) throw err;
        });
    }
    catch (err) { res.statusCode = 500 }
})


/*-----------------*/


/*User registration*/
app.post("/register", (req, res) => {
    let username = req.body.username;
    let firstLastName = req.body.firstlastname;
    let email = req.body.email;
    let password = req.body.password;

    try {
        connection.connect();
        connection.query(`insert into users values(null,0, "${username}","${firstLastName}","${email}","${password}", 0)`);
        res.redirect(`/`)
    }
    catch (err) {
        res.statusCode = 500;
    }
})
/*-----------------*/

/*Logic For User Profile */
connection.connect(err => {
    if (err) throw err;
    console.log("Connected")
})

app.get("/users", (req, res) => {
    connection.query("select * from users", (err, result) => {
        if (err) console.log(err);
        res.send(result)
    })
})

app.get("/users/:username", (req, res) => {
    let username = req.params.username;
    connection.query(`select * from users where username like "${username}"`, (err, result) => {
        if (err) console.error(err);
        res.send(result)
    })
})

app.get("/users/search/:user", (req, res) => {
    let user = req.params.user;
    connection.query(`select * from users where username like "${user}%"`, (err, result) => {
        if (err) console.error(err);
        res.send(result)
    })
})

app.get("/users/profile/:username", (req, res) => {
    let username = req.session.user.username;
    connection.query(`select * from users where username = "${username}"`, (err, result) => {
        if (err) console.log(err);
        res.send(result)
    });
});

app.put("/profile/edit/:username", (req, res) => {
    let oldName = req.session.user.username;
    let data = req.body;
    if (data.newuser != "") {
        connection.query(`update users set username = "${data.newuser}" where UserId = ${data.id};`, (err, result) => {
            if (err) console.log(err);
            connection.query(`update posts set creatorName = "${data.newuser}" where creatorName = "${oldName}"`, (err, result) => {
                if (err) console.log(err);
                console.log("Profile Updated");
                res.status(200);
                res.redirect("/feed")

            })
        })
    }
    if (data.newpass != "") {
        connection.query(`update users set password="${data.newpass}" where UserId = ${data.id}`, (err, result) => {
            if (err) console.error(err);
        })
    };
})

app.put("/profile/edit/pic/:username", (req, res) => {
    let picId = req.body;
    connection.query(`update users set profileId = ${picId.picId} where username = "${req.session.user.username}"`, (err, result) => {
        if (err) console.error(err);
        res.status(200);
        res.send("Pic updated")
    })
})
/*----------------*/

/*Logic for posts */

app.get("/posts", (req, res) => {
    connection.query("select * from posts", (err, result) => {
        if (err) console.error(err);
        res.send(result)
    })
})

app.get("/posts/:username", (req, res) => {
    let username = req.params.username
    connection.query(`select * from posts where creatorName = "${username}"`, (err, result) => {
        if (err) console.log(err);
        res.send(result)
    })
})

app.get("/posts/id/:id", (req, res) => {
    let id = req.params.id;
    connection.query(`select * from posts where postId = ${id}`, (err, result) => {
        if (err) console.log(err);
        res.send(result)
    })
})

app.put("/posts/update/:id", (req, res) => {
    let data = req.body;
    connection.query(`update posts set postTitle = "${data.update}" where postId = ${data.id} `, (err, result) => {
        if (err) console.log(err);
        console.log("Post Updated");
        res.redirect("/feed")
    });

})

app.delete("/posts/delete/:id", (req, res) => {
    let id = req.params.id;
    connection.query(`delete from posts where postId = ${id} `);
    console.log("Post Deleted")
})

app.post("/posts/createpost/upload", (req, res) => {
    let username = req.session.user.username;
    let content = req.body.content;
    connection.query(`insert into posts values(null,"${username}","${content}",0)`);
    console.log("Post Created"),
        res.redirect("/feed")
})

/*------------*/


app.listen(PORT, (req, res) => {
    console.log("Server running on port " + PORT)
})