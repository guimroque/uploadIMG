const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const session = require("express-session");
const path = require('path')
const fileUpload = require('express-fileupload')
var generateSafeId = require('generate-safe-id');

// View engine
app.set('view engine','ejs');
app.set('views', __dirname + '/views'); //Local onde vai ser salvo o file
app.use(express.static(path.join(__dirname, 'public')));//local dos arquivos estaticos

app.use(session({
    secret: "qualquercoisa", cookie: { maxAge: 30000000},
    saveUninitialized: true,
    resave: true
}))


//Body parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(fileUpload());//setando uso da biblioteca fileupload


// Router

    app.get("/", (req, res) => {
        res.render("index.ejs");
    })
    app.post('/', (req, res)=>{

        console.log(req.body)
        var file = req.files.uploaded_image;
        var id = generateSafeId();
        var img_name=id+file.name;
        console.log(img_name)
        file.mv('public/images/upload_images/'+img_name, function(err) {
        //envia para o banco de dados, apenas salvamos imagem com id gerado e usamos apenas o endereço para acessamor do BD.
            if (err)
              return res.status(500).send(err);
                 });
    });

// End Router
app.listen(3000, () => {
    console.log("O servidor está rodando!")
})