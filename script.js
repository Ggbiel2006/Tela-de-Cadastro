const body = document.body;
const raiz = document.documentElement;

// Alto contraste
const btnContraste = document.getElementById('btn-contraste');
btnContraste.addEventListener('click', () => {
  const ativo = body.classList.toggle('alto-contraste');
  btnContraste.setAttribute('aria-pressed', ativo);
});

// Tamanho da fonte (entre 80% e 160%)
let tamanhoFonte = 100;
function ajustarFonte(delta) {
  tamanhoFonte = Math.min(160, Math.max(80, tamanhoFonte + delta));
  raiz.style.setProperty('--tamanho-fonte', tamanhoFonte + '%');
}
document.getElementById('btn-aumentar').addEventListener('click', () => ajustarFonte(10));
document.getElementById('btn-diminuir').addEventListener('click', () => ajustarFonte(-10));

// Leitura em voz alta (Web Speech API)
const btnLer = document.getElementById('btn-ler');
btnLer.addEventListener('click', () => {
  if (!('speechSynthesis' in window)) {
    mostrarMensagem('Seu navegador não suporta leitura em voz alta.', 'erro-geral');
    return;
  }
  if (speechSynthesis.speaking) {
    speechSynthesis.cancel();
    return;
  }
  const textos = [document.getElementById('titulo-cadastro').textContent];
  document.querySelectorAll('#formulario label, #formulario legend, #formulario .dica').forEach((el) => {
    textos.push(el.textContent.replace('*', ', obrigatório'));
  });
  const fala = new SpeechSynthesisUtterance(textos.join('. '));
  fala.lang = 'pt-BR';
  speechSynthesis.speak(fala);
});

// Mostrar / ocultar senha
const senha = document.getElementById('senha');
const btnSenha = document.getElementById('btn-mostrar-senha');
btnSenha.addEventListener('click', () => {
  const mostrar = senha.type === 'password';
  senha.type = mostrar ? 'text' : 'password';
  btnSenha.textContent = mostrar ? 'Ocultar' : 'Mostrar';
  btnSenha.setAttribute('aria-pressed', mostrar);
});

// Mensagem geral: visual (com piscada) + anunciada pelo leitor de tela
const mensagem = document.getElementById('mensagem');
function mostrarMensagem(texto, tipo) {
  mensagem.hidden = false;
  mensagem.className = 'mensagem piscar ' + tipo;
  mensagem.textContent = texto;
  mensagem.focus();
}

// Validação com mensagens associadas a cada campo
function definirErro(campo, idErro, texto) {
  document.getElementById(idErro).textContent = texto;
  campo.setAttribute('aria-invalid', texto ? 'true' : 'false');
  return !texto;
}

document.getElementById('formulario').addEventListener('submit', (evento) => {
  evento.preventDefault();
  const nome = document.getElementById('nome');
  const email = document.getElementById('email');
  const termos = document.getElementById('termos');

  const validos = [
    definirErro(nome, 'erro-nome', nome.value.trim() ? '' : 'Informe seu nome completo.'),
    definirErro(email, 'erro-email', email.validity.valid && email.value ? '' : 'Informe um e-mail válido.'),
    definirErro(senha, 'erro-senha', senha.value.length >= 8 ? '' : 'A senha precisa ter pelo menos 8 caracteres.'),
    definirErro(termos, 'erro-termos', termos.checked ? '' : 'Você precisa aceitar os termos de uso.'),
  ];

  const erros = validos.filter((ok) => !ok).length;
  if (erros) {
    mostrarMensagem(`Encontramos ${erros} erro(s) no formulário. Corrija os campos destacados.`, 'erro-geral');
    return;
  }

  mostrarMensagem('Cadastro realizado com sucesso!', 'sucesso');
  evento.target.reset();
});
