const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const args = process.argv.slice(2);
const nomeDoFilme = args.join(" ");

if (!nomeDoFilme) {
  console.log("❗ Por favor, digite o nome de um filme.");
  process.exit(1);
}

const API_KEY = "f4af485d";

async function buscarFilme(nome) {
  const url = `https://www.omdbapi.com/?t=${encodeURIComponent(nome)}&apikey=${API_KEY}`;

  try {
    const resposta = await fetch(url);
    const filme = await resposta.json();

    if (filme.Response === "False") {
      console.log("❌ Filme não encontrado.");
      return;
    }

    console.log(`\n🎬 Título: ${filme.Title}`);
    console.log(`📅 Ano: ${filme.Year}`);
    console.log(`🎭 Gênero: ${filme.Genre}`);
    console.log(`⭐ Nota IMDb: ${filme.imdbRating}`);
    console.log(`🧠 Diretor: ${filme.Director}`);
  } catch (erro) {
    console.log("⚠️ Erro ao buscar o filme:", erro.message);
  }
}

buscarFilme(nomeDoFilme);