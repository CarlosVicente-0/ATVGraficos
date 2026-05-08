const botao = document.getElementById("btnAdicionar");
const canvas = document.getElementById("grafico");
const ctx = canvas.getContext("2d");
const pessoas = [];

botao.addEventListener("click", adicionarPessoa);

function adicionarPessoa() {
  const nome = document.getElementById("nome").value.trim();
  const nota1 = Number(document.getElementById("nota1").value);
  const nota2 = Number(document.getElementById("nota2").value);

  if (!nome) {
    alert("Informe o nome da pessoa.");
    return;
  }

  if (isNaN(nota1) || isNaN(nota2) || nota1 < 0 || nota1 > 10 || nota2 < 0 || nota2 > 10) {
    alert("Informe notas válidas entre 0 e 10.");
    return;
  }

  const media = (nota1 + nota2) / 2;
  pessoas.push({ nome, nota1, nota2, media });

  document.getElementById("nome").value = "";
  document.getElementById("nota1").value = "";
  document.getElementById("nota2").value = "";
  document.getElementById("nome").focus();

  desenharGrafico();
}

function desenharGrafico() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (pessoas.length === 0) {
    ctx.fillStyle = "black";
    ctx.font = "20px Arial";
    ctx.fillText("Adicione uma pessoa para ver o gráfico.", 20, 150);
    return;
  }

  const maxAltura = 220;
  const padding = 20;
  const itemWidth = (canvas.width - padding * 2) / pessoas.length;
  const barWidth = Math.min(80, itemWidth * 0.7);

  pessoas.forEach((pessoa, index) => {
    const x = padding + index * itemWidth + (itemWidth - barWidth) / 2;
    const altura = (pessoa.media / 10) * maxAltura;
    const y = canvas.height - padding - altura;

    ctx.fillStyle = "#4a90e2";
    ctx.fillRect(x, y, barWidth, altura);

    ctx.fillStyle = "black";
    ctx.font = "14px Arial";
    ctx.textAlign = "center";
    ctx.fillText(pessoa.nome, x + barWidth / 2, canvas.height - padding + 18);
    ctx.fillText(pessoa.media.toFixed(1), x + barWidth / 2, y - 10);
  });

  ctx.textAlign = "start";
  ctx.fillStyle = "black";
  ctx.font = "16px Arial";
  ctx.fillText("Média de cada pessoa (0-10)", 20, 20);
}

desenharGrafico();