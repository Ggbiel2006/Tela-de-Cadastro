# Tela de Cadastro Acessível

Tela de cadastro em HTML e CSS pensada para pessoas com deficiência visual e auditiva.

Para usar, abra o `index.html` no navegador.

## Recursos de acessibilidade

### Deficiência visual
1. **Modo alto contraste**: botão que troca as cores para preto, branco e amarelo.
2. **Ajuste do tamanho da fonte**: botões A+ e A- (de 80% até 160%).
3. **Leitura em voz alta**: o botão "Ouvir página" lê os campos do formulário (Web Speech API, em pt-BR).
4. **Compatível com leitores de tela**: HTML semântico, `label` ligado a cada campo, `aria-describedby` para dicas e erros, `aria-live` para anunciar mensagens e link "Pular para o formulário".
5. **Navegação por teclado**: contorno de foco bem visível e botão para mostrar/ocultar a senha.
6. **Erros que não dependem só de cor**: cada erro tem ícone ⚠, texto e borda mais grossa.

### Deficiência auditiva
1. **VLibras**: widget oficial do governo que traduz o conteúdo da página para Libras.
2. **Avisos 100% visuais**: as mensagens de sucesso e erro piscam na tela, sem depender de som.
3. **Preferência de contato sem voz**: opções de aviso por e-mail, SMS ou vídeo em Libras.
