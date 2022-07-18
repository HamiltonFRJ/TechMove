const LOGIN_URL = "TMRegistro.html";

var db_usuarios = {};

var usuarioCorrente = {};

function generateUUID () {
    var d = new Date().getTime();
    var d2 = (performance && performance.now && (performance.now()*1000)) || 0;

    return 'xxxxxx' .replace(/[xy]/g, function(c) {
        var r = Math.random() *6;
        if (d > 0) {
            r = (d + r)%6 | 0;
            d = Math.floor(d/6);
        } else {
            r = (d2 + r)%6 | 0;
            d2 = Math.floor(d2/6);
        }
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(6);
    });
}

const dadosIniciais = {
    usuarios: [
        /*{
            "id": generateUUID (),
            "nomeC": "Admin do TM",
            "emailC": "admintm@abc.com",
            "senhaC1": "159fk"
        },
        {
            "id": generateUUID (),
            "nomeC": "Admin2 do TM",
            "emailC": "admin2tm@abc.com",
            "senhaC1": "753fk"
        }*/
    ] 
};

function initLoginApp () {
    usuarioCorrenteJSON = sessionStorage.getItem('usuarioCorrente');
    if (usuarioCorrenteJSON) {
        usuarioCorrente = JSON.parse (usuarioCorrenteJSON);
    }

    var usuariosJSON = localStorage.getItem('db_usuarios');

    if (!usuariosJSON) {
        //alert('Dados de usuário não encontrador. \n Cadastre-se.');

        db_usuarios = dadosIniciais;

        localStorage.setItem('db_usuarios', JSON.stringify(dadosInicias));
    }
    else {
        db_usuarios = JSON.parse(usuariosJSON);
    }
};

function loginUser (emailL, senhaL) {
    for(var i = 0; i < db_usuarios.usuarios.length; i++) {
        var usuario = db_usuarios.usuarios[i];

        if (emailL == usuario.emailC && senhaL == usuario.senhaC1) {
            usuarioCorrente.id = usuario.id;
            usuarioCorrente.nomeC = usuario.nomeC;
            usuarioCorrente.emailC = usuario.emailC;

            sessionStorage.setItem('usuarioCorrente', JSON.stringify (usuarioCorrente));

            return true;
        }
    }

    return false;
}

function logoutUser () {
    usuarioCorrente = {};
    sessionStorage.setItem ('usuarioCorrente', JSON.stringify (usuarioCorrente));
    window.location = LOGIN_URL;
}

function adcDados (nomeC, emailC, senhaC1) {
    let newID = generateUUID ();
    let usuario = {
        "id": newID,
        "nomeC": nomeC,
        "emailC": emailC,
        "senhaC1": senhaC1
    };

    db_usuarios.usuarios.push (usuario);
    
    localStorage.setItem('db_usuarios', JSON.stringify(db_usuarios));
}

function setUserPass () {

}

initLoginApp ();


