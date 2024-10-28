const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

const admin = require("firebase-admin");

const serviceAccount = {
  type: process.env.TYPE,
  project_id: process.env.PROJECT_ID,
  private_key_id: process.env.PRIVATE_KEY_ID,
  private_key: process.env.PRIVATE_KEY.replace(/\\n/g, '\\n'),
  client_email: process.env.CLIENT_EMAIL,
  client_id: process.env.CLIENT_ID,
  auth_uri: process.env.AUTH_URI,
  token_uri: process.env.TOKEN_URI,
  auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.CLIENT_X509_CERT_URL,
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore();

app.use(cors());
app.use(express.json());
app.get('/cartoes'), async (req, res) => {
    try {
      const response = await db.collection('cartoes').get();
      const cartoes = response.docs.map(doc => ({
        id: doc.id, ...doc.data(),
      }));
      console.log(cartoes);
      res.status(200).json({cartoes});
      console.log('Cartoes funfando vapo');
    }catch (e){
      console.log(e);
      res.status(500).json({mensagem: 'Error' + e});
      console.log('Cartoes não foram encontrados afe');
    }
};


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

app.post('/cartoes', (req, res) => {
    const{nome, valor, imagem} = req.body;

    cartoes.push({nome: nome, valor: valor, imagem: imagem});
    console.log(cartoes);
    res.status(201).json({ mensagem: 'Deu boa o post',});
});

app.delete('/cartoes', (req, res) => {
    const { cartao } = req.body;
    cartoes.splice(cartao, 1);
    console.log(cartao + 'deletado');
    res.status(201).json({ mensagem: 'Deu boa o delete' + cartao });
});


app.put('/cartoes', (req, res) => {
    const {nome, valor, id, imagem} = req.body;

    cartoes[id] = {nome: nome, valor: valor, imagem: imagem};
    console.log(cartoes);
    res.status(201).json({ mensagem: 'Deu boa o put' });
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});


