const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

const port = 3000;

const Usuario = mongoose.model("Usuario", {
  nome: String,
  cpf: Number,
  data_nascimento: { type: Date },
});


app.get("/:cpf", async (req, res) => {
    const cpf = req.params.cpf;
    const user = await Usuario.findOne({ cpf: cpf });

    if (user) {
        res.send(user);
    } else {
        res.status(404).send("Usuário não encontrado");
    }
});

app.post("/", async (req, res) => {
  const user = new Usuario({
    nome: req.body.nome,
    cpf: req.body.cpf,
    data_nascimento: req.body.data_nascimento,
  });

  await user.save();
  res.send(user);
});

app.listen(port, () => {
  mongoose.connect(
    "mongodb+srv://ewertonlu8659:qTkTY3assdrY8S89@cluster0.jxsnfqu.mongodb.net/?retryWrites=true&w=majority"
  );

  console.log(`App running at http://localhost:${port}`);
});
