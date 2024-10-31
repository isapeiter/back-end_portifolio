const cors = require('cors');
const express = require('express');
const admin = require("firebase-admin");

const app = express();
// const port = 3000;

const serviceAccount = {
  type: "service_account",
  project_id: "bd-portifolioisa",
  private_key_id: "5974f8c4d0fd4f17a27bdbadce433dcbd43bf228",
  private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDVnKERVOh/0tPI\nV3+dhDYE5UUHRqavC/DqOKUgcLetplzeRfiJUSwX0uLlBmzOh2urTBBf/QLNjpEa\nYcNY7PDDyd8n/Yyoih5g3wzWWCc89SjJtz5OYC9MWdDH6TV+iE7ySLFO0LJ7yHmu\nTocuGufh9BPpqZA9KLf9JlEky1QjYDHgeZr/5FgcuWKf+Oz7UgBz+rwySAewVl98\nINbHIyCRDJ2T2dmWUDvU1XcbHe/moLqxL/nKTDKbgmCQidf4WV1HvRx3lFYUPw42\nQR1PB3IJBVKNd2e1r3kjVAY24wvcgAScpEe38aoWB589dJ/BBJn6nxawgEI/UWzz\nulNrmRtvAgMBAAECggEAUZ9B5G9/T6htiDX262djhMdecwNKGcUET1tJrXWkmdPh\n1IUEDORZZtkMHdswpFIWkCPGdgcllQoO4/fLPyV6cjWm8Y7uuk/cf8N7EkQo6h/7\nb+h3BFe4ewIuxtSTvj+zetzP83/HU4ktBa+386QQSsSK/1Pta5EtjKuhgd+3zLP3\n4ZB1HypQm2DMH77UVP9UdvEDta+gOC9BouurNkrWf1QP/98PHRiqK9STFPrxMZce\nPS//C5vZdx5dvH/TgNLAXfligq2vH6QAFBzNcQLNW9WDxrpIcNLCZSFuLBxUAFqb\nYeRS7U5LfkyhuNVw/nFVsAFjWTgDXDUfKej8PYtCYQKBgQD8QOnNVNwaeRl2Sh3S\nOLoHqHJnPuAxqBzswhAkSQ57ZWhc+qqOsBXI61ENVX35RyNijl7qi2PawjqcDubp\ngwCCRZ7wcZ5uu4nOsSSyOWMdYo4u95Ta4QNGkMcUtasOsDapjprH36Bd0tFw3V7W\n0FlZDVBQcl2icmj7E2d+GIW3twKBgQDYyMwR9d54/vthtVPLXxaObxpjj/G+McZ7\n7PDsX+HEsisT7ODfmVWg7iaZZPpfTJ7GUIKgrgAHWCW3g7n0CI2dEiuUUN8Wn68O\nU5pjddDWSiTzk51pU2cpG3TYV0JVU+IwixC1VahJNccPDtzyoUZvTfF8y7UchEJ5\nNKkNEwuKCQKBgQDENjXmioh+aw38LeCOYaOKS2NZndXDqlF9c+IcZ1tFbnbERBKg\n1KTNWQT9yy8m1EfY5Ic+B1iPk58FPq4smsKtkjv0KVykI2opBS9XFj5bYAray6fU\nrUvf+sNv/3NkBHswXoVUzUSvVkmlcfvQOdYV574+JQdiUX4JNmm88pQodwKBgQCp\nWoSB62/3WksME9n4YLqAXy9gZE1YZg5HNd0o6+a2APJCSKWMSH9qj2G8J/SoinTn\nPHIwEH6ZPjWI3fFhQWVQNaex4FPHmsvpB0rvNFUHczjWyJUKeUt4A6kOcWyyuCtV\n/O36m4YyWz689sGJEpCx11Q2R/We53v+sDL4sc4r8QKBgDJcGIo40FIaZdP6sJGf\n33+IJn042Ac83Y5jrfVXii2Nh/CrHfAHttq56nyFcIi4U527rYeHM8vjf01rzY+o\ny9juKZwnCU1HFkzYMhFPCEbmB2zIQjDlaJBntuzoxWo8MvoWHTYEorCuayZdqTB5\n278kW+vMsn+bNowsbeUZHw3G\n-----END PRIVATE KEY-----\n",
  client_email: "firebase-adminsdk-cxm68@bd-portifolioisa.iam.gserviceaccount.com",
  client_id: "113454937827680119010",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-cxm68%40bd-portifolioisa.iam.gserviceaccount.com",
  universe_domain: "googleapis.com"
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore();

app.use(cors());
app.use(express.json());
app.get('/cartoes', async (req, res) => {
    try {
      const response = await db.collection('Cartoes').get();
      const cartoes = response.docs.map(doc => ({
        id: doc.id, ...doc.data(),
      }));
      console.log(cartoes);
      res.status(200).json({cartoes});
      console.log('Cartoes funfando vapo');
    }catch (e){
      console.log(e);
      res.status(500).json({mensagem: 'Error' + e});
      console.log('Cartoes não foram encontrados afe' + e);
    }
});


// Lista completa de cartões
// let cartoes = [
//   { nome: 'Aurelia aurita', valor: 'R$80,90', imagem: 'https://thumbs.dreamstime.com/b/medusa-aurelia-aurita-da-lua-sobre-o-fundo-preto-66820681.jpg' },
//   { nome: 'Chrysaora quinquecirrha', valor: 'R$84,67', imagem: 'https://st5.depositphotos.com/4875319/65966/i/450/depositphotos_659662678-stock-photo-macro-shot-chrysaora-quinquecirrha-underwater.jpg' },
//   { nome: 'Pelagia noctiluca', valor: 'R$71,90', imagem: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAZ1PYxz7UUEugh8h9VhLtHo64F35C19hPeFBheRJJJDwqLRNhhLaTqaPvTPVFoe8pY4k&usqp=CAU' },
//   { nome: 'Turritopsis dohrnii', valor: 'R$88,67', imagem: 'https://cdn.mos.cms.futurecdn.net/2YMjiRAsEUsvTKpamuAk7f-1200-80.jpg.webp' },
//   { nome: 'Cyanea capillata ', valor: 'R$94,59', imagem: 'https://media.gettyimages.com/id/991117660/pt/foto/jellyfish-05.jpg?s=612x612&w=gi&k=20&c=wok1eMKq2y5ub4Jq4dYO7njVV0P5XQeEFq-l1jV1Ktw=' },
//   { nome: 'Physalia physalis', valor: 'R$90,30', imagem: 'https://st5.depositphotos.com/72897924/61865/i/450/depositphotos_618652144-stock-photo-beautiful-philippines-underwater-jellyfish.jpg' },
//   { nome: 'Mastigias papua', valor: 'R$48,90', imagem: 'https://s3.animalia.bio/animals/photos/full/original/lagoon-jelly-fish-10722963003.webp' },
//   { nome: 'Cassiopea andromeda', valor: 'R$65,80', imagem: 'https://www.shutterstock.com/image-photo/cassiopeia-andromeda-invasive-jellyfish-mediterranean-600nw-2081844409.jpg' },
//   { nome: 'Chironex fleckeri', valor: 'R$64,93', imagem: 'https://t3.ftcdn.net/jpg/02/34/88/60/360_F_234886019_wweLxLn9axxeNOEaAV4bCHrKREKcEnc0.jpg' },
//   { nome: 'Rhizostoma pulmo', valor: 'R$60,96', imagem: 'https://i.ytimg.com/vi/MXqVGf4T8zM/maxresdefault.jpg?sqp=-oaymwEmCIAKENAF8quKqQMa8AEB-AH-CYAC0AWKAgwIABABGE4gVyhlMA8=&rs=AOn4CLDmt5YNKQTM7_wvWnvPJGjBCCT3ow' },
//   { nome: 'Catostylus mosaicus', valor: 'R$87,93', imagem: 'https://thumbs.dreamstime.com/b/medusas-de-incandesc%C3%AAncia-4548496.jpg' },
//   { nome: 'Periphylla periphylla', valor: 'R$46,50', imagem: 'https://media.gettyimages.com/id/1209643557/pt/foto/ocean-jellyfish.jpg?s=612x612&w=gi&k=20&c=SSzrH-zgkQG3ZgIZPduYa0OzWZ-75B1E_Wk_x5QromU=' },
//   { nome: 'Aequorea victoria', valor: 'R$80,67', imagem: 'https://png.pngtree.com/thumb_back/fh260/background/20220707/pngtree-a-bioluminescent-hydrozoan-named-aequorea-victoria-also-known-as-the-crystal-jellyfish-photo-image_24990608.jpg' },
//   { nome: 'Phacellophora camtschatica', valor: 'R$97,90', imagem: 'https://www.shutterstock.com/image-photo/fried-egg-jellyfish-phacellophora-camtschatica-260nw-1834707892.jpg' },
//   { nome: 'Crambione mastigophora', valor: 'R$64,80', imagem: 'https://www.alagoas24horas.com.br/745718/incidencia-de-aguas-vivas-e-alta-em-praias-alagoanas/agua-viva/' },
//   { nome: 'Cephea cephea', valor: 'R$91,98', imagem: 'https://mh-1-cdn.panthermedia.net/media/previews/0014000000/14804000/~%C3%81gua-viva-da-coroa-netrostoma-setouchina_14804203_preview.jpg' },
//   { nome: 'Atolla wyvillei', valor: 'R$83,90', imagem: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTLiwVmQn72wVkkyK0oBOX907w3cxaspsxrA&s' },
//   { nome: 'Tamoya haplonema', valor: 'R$99,99', imagem: 'https://t2.ea.ltmcdn.com/pt/posts/7/8/1/tamoya_haplonema_25187_8_600.jpg' },
//   { nome: 'Lychnorhiza lucerna', valor: 'R$68,60', imagem: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPjzxFt8yD_-7QjtkuaDqC04GNK8h_ezq9sw&s' },
//   { nome: 'Chrysaora fuscescens', valor: 'R$26,99', imagem: 'https://static.vecteezy.com/ti/fotos-gratis/t2/46764558-gigante-medusa-dentro-habitat-mar-vida-fundo-foto.jpg' }
// ];

// app.get('/cartoes', (req, res) => {
//     res.status(200).json({cartoes});
//     console.log('oi');
// });

app.post('/cartoes', async (req, res) => {
    const{nome, valor, imagem} = req.body;
    if (!nome) {
       res.status(404).json({mensagem: "Nome do cartão invalido!"});
       console.log('Novo cartão não cadastrado, nome invalido!');  
    }else if (!imagem){
       res.status(404).json({mensagem: "Imagem do cartão invalida!"});
       console.log('Novo cartão não cadastrado, imagem invalida!');
    }else if (!valor) {
       res.status(404).json({mensagem: "Valor do cartão invalido!"});
       console.log('Novo cartão não cadastrado, valor invalido!');
    }else{
      try {
        const novoCartaoRef = await db.collection('Cartoes').add({
          nome,
          valor,
          imagem,
          criadoEm: admin.firestore.FieldValue.serverTimestamp()
        });
        res.status(201).json({mensagem: 'Cartão cadastrado com sucesso!', id: novoCartaoRef.id });
        console.log('Novo cartão cadastrado com ID:', novoCartaoRef.id);
      } catch (error) {
        console.error('Erro ao cadastrar cartão:', error);
        res.status(500).json({mensagem: 'Error ao cadastrar cartão'});
      }
    };

    // cartoes.push({nome: nome, valor: valor, imagem: imagem});
    // console.log(cartoes);
    // res.status(201).json({ mensagem: 'Deu boa o post',});
});

app.delete('/cartoes', async (req, res) => {
  const id = req.body.cartoes;
  if (!id) {
     res.status(400).json({mensagem: "ID do cartão não fornecido!"});
     console.log('Cartão não encontrado!');
  } else {
    try {
      const cartaoRef = db.collection('Cartoes').doc(id);
      const doc = await cartaoRef.get();
      if (!doc.exists) {
        res.status(404).json({mensagem: "Cartão com ID " + id + " não encontrado"});
        console.log('Cartão com ID: ' + id + ' não encontrado');
      } else {
        await cartaoRef.delete();
        res.status(200).json({mensagem: "Cartão com ID " + id + " deletado"});
        console.log('Cartão com ID: ' + id + ' deletado');
      }
    } catch (error) {
      console.error('Erro ao deletar cartão:', error);
      res.status(500).json({mensagem: 'Error ao deletar cartão'});
    }
  }
});



app.put('/cartoes', async (req, res) => {
  const {nome, imagem, valor, id} = req.body;
  if (!id){
     res.status(400).json({mensagem: "ID do cartão não fornecido!"});
     console.log('Cartão não encontrado!');
  }else{
    try{
      const cartaoRef = db.collection('Cartoes').doc(id); // Correção da referência do ID do cartão
      const doc = await cartaoRef.get();
      if (!doc.exists) {
        res.status(404).json({mensagem: "Cartão com ID" + id + "não encontrado"});
        console.log('Cartão não encontrado!');
      } else {
        const dadosAtualizados = {};
        if (nome) dadosAtualizados.nome = nome;
        if (imagem) dadosAtualizados.imagem = imagem;
        if (valor) dadosAtualizados.valor = valor;
        await cartaoRef.update(dadosAtualizados);
        res.status(200).json({mensagem: "Cartão com ID" + id + "atualizado"});
        console.log('Cartão com ID:' + id +'atualizado');
      }
    }catch (error) {
      console.error('Erro ao atualizar cartão:', error);
      res.status(500).json({mensagem: 'Error ao atualizar cartão'});
    }
  }
})

module.exports = app;

// app.listen(3000, () => {
//   console.log('rodando')
// });

// app.listen(port, () => {
//     console.log(`Servidor rodando na porta ${port}`);
// });


