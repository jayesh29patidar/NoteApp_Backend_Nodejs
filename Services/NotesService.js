var axios = require("axios");
const NOTE_BASE_URL = "http://localhost:8080/api/v1"

var getWelocme = () => {
    return axios.get(NOTE_BASE_URL + "/welcome");

};

var getUser = () => {
    return axios.get(NOTE_BASE_URL + "/user");
};

var createUser = (user) => {
    return axios.post(NOTE_BASE_URL + "/user", user);
};

var loginUser = (user) => {
    return axios.post(NOTE_BASE_URL + "/user" + "/login", user);
}

var getNotes = () => {
    return axios.get(NOTE_BASE_URL + "/notes");
};

var createNotes = (note) => {
    return axios.post(NOTE_BASE_URL + "/notes", note);
};

var getNotesById = (id) => {
    return axios.get(NOTE_BASE_URL + "/notes/" + id);
};

var updateNote = (id, note) => {
    return axios.put(NOTE_BASE_URL + "/notes/" + id, note);
};

var deleteNote = (id, note) => {
    return axios.delete(NOTE_BASE_URL + "/notes/" + id);
};

var findNotesByUser = (user) => {
    return axios.post(NOTE_BASE_URL + "/notes" + "/get-all", user, {
        headers: {
            "Content-Type": "application/json",
        },
    });
};

module.exports.getWelocme = getWelocme;
module.exports.getUser = getUser;
module.exports.createUser = createUser;
module.exports.loginUser = loginUser;
module.exports.getNotes = getNotes;
module.exports.createNotes = createNotes;
module.exports.updateNote = updateNote;
module.exports.deleteNote = deleteNote;
module.exports.getNotesById = getNotesById;
module.exports.findNotesByUser = findNotesByUser;