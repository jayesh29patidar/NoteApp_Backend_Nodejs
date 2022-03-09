const { default: axios } = require('axios');
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const NotesService = require("./Services/NotesService");

const app = express();
var cors = require('cors')
app.use(cors());
app.use(express.json());

app.get('/api', (req, res) => {

    NotesService.getWelocme().then((bootRes) => {

        console.log(bootRes.data);

        res.json({ message: bootRes.data });

    });
});

app.get('/api/user', (req, res) => {

    NotesService.getUser().then((bootRes) => {

        console.log(bootRes.data);

        res.json({ message: bootRes.data });

    });
});

app.post('/api/user', async (req, res) => {
    var user = req.body;
    console.log(req.body);

    NotesService.createUser(user).then((bootRes) => {

        console.log("user by spring", bootRes.data);
        res.json({ message: bootRes.data });
    });
});

// ____________________________________________________________login____________
app.post('/api/user/login', async (req, res) => {
    var user = req.body;
    var userToken = "";
    console.log(req.body);
    console.log("login => react", user);

    jwt.sign({ user }, 'secretkey', { expiresIn: '30s' }, (err, token) => {
        userToken = token;
    });

    NotesService.loginUser(user).then((bootRes) => {
        console.log("user by spring", bootRes.data);
        res.json({ message: bootRes.data, userToken });
    })

})

// ________________________________________________________Get_________________
app.get('/api/user/notes', (req, res) => {

    NotesService.getNotes().then((bootRes) => {

        console.log(bootRes.data);

        res.json({ message: bootRes.data });

    });
});

// _________________________________________________________Create_____________
app.post('/api/user/notes', async (req, res) => {
    var note = req.body;
    console.log(req.body);

    NotesService.createNotes(note).then((bootRes) => {

        console.log("user by spring", bootRes.data);
        res.json({ message: bootRes.data });
    });
});

// _________________________________________________________Get By Id__________

app.get('/api/user/notes/:id', async (req, res) => {
    var id = req.params.id;
    NotesService.getNotesById(id).then((bootRes) => {

        console.log(bootRes.data);

        res.json({ message: bootRes.data });

    });
});

// _________________________________________________________Update____________
app.put('/api/user/notes/:id', async (req, res) => {
    var updateNote = req.body;
    var id = req.params.id;

    console.log("update note:", updateNote);
    console.log("id:", id);

    NotesService.updateNote(id, updateNote).then((bootRes) => {
        res.json({ message: bootRes.data });
    });
});
// __________________________________________________________Delete__________

app.delete('/api/user/notes/:id', async (req, res) => {
    NotesService.deleteNote(req.params.id).then((bootRes) => {
        res.json({ message: bootRes.data });
    });
});

// __________________________________________Find notes with user id_________

app.post("/api/user/notes/notes-by-user", (req, res) => {
    console.log(req.body);
    NotesService.findNotesByUser(req.body).then((bootRes) => {
        console.log(bootRes.data);
        res.json({ notesData: bootRes.data });
    });
});

// _________________________________________________________________________

app.post('/api/posts', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            res.json({
                message: 'Post created...',
                authData
            });
        }
    });
});

app.post('/api/login', (req, res) => {
    // Mock user
    const user = {
        id: 1,
        username: 'brad',
        email: 'brad@gmail.com'
    }

    jwt.sign({ user }, 'secretkey', { expiresIn: '30s' }, (err, token) => {
        res.json({
            token
        });
    });
});

// Verify Token
function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {       
        res.sendStatus(403);
    }

}

app.listen(5000, () => console.log('Server started on port 5000'));