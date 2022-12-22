//IMPORTANDO PARA O JS=================================================================
let input = document.querySelector(".input")
let botao = document.querySelector(".botao")
let aviso = document.querySelector(".aviso")
let mostrarDom = document.querySelector(".mostrarDom")
//IMPORTANO PARA O JS===================================================================

//SALVANDO NO LOCALSTORAGE=============================================================
botao.addEventListener("click", salvando)

/*Aqui estamos pegando a chave que ainda vai ser criada com o getItem, e transformando o conteudo da chave que 
está em string em array com JSON.parse*/
let pegandoChave = JSON.parse(localStorage.getItem("__Chave__")) || []
function salvando(event) {
event.preventDefault()
let dados = {
 Nota: input.value,
/*Aqui estamos estamos pegando a quantidade slots que tem dentro de Pegando chave e botando mais 1 
para não começar de zero. então quando o cliente for registrado ele vai mostrar o numero do slot onde ele tá
ou seja se ele ocupa o slot 0 na exibição vai mostrar ele como 1 já que a gente botou +1 */ 
 NmrInd: pegandoChave.length + 1
}

if(!dados.Nota){
aviso.innerHTML = `Preencha o campo`
}
else{
aviso.innerHTML = ``
pegandoChave.push(dados)
criandoDom()
}
}
//SALVANDO NO LOCALSTORAGE================================================================

//CRIANDO DOM=============================================================================
function criandoDom() {
/*Aqui* estamos criando a chave e setando as infos de pegandoChave no localstorage mas para setar essas infos no localstorage
Essas infos precisam está em formato de string e pra isso é usado o JSON.stringify */
 localStorage.setItem("__Chave__", JSON.stringify(pegandoChave))

/* Aqui estamos ocultando todos os outros dados para quando vc preencher o cadastro e cliclar em salvar
só aparecer aquele que vc acabou de cadastrar, e não os outros dados que já foram cadastrados*/
mostrarDom.innerHTML = ""

/*Com forEach estamos indo em todos os slots de PegandoChave e botando todo conteudo do slot que foi preenchido no momento em infosPessoais e criando um DOM que vai exibir esse conteudo*/
pegandoChave.forEach(function(infosPessoais){

let divDom = document.createElement("div")
divDom.classList.add("divDom")
mostrarDom.appendChild(divDom)

let checkDom = document.createElement("button")
checkDom.classList.add("checkDom")
checkDom.innerHTML = `<i class="fa-solid fa-check"></i>`

checkDom.onclick = function riscar(){
  inputDom.classList.toggle("riscar")
}
divDom.appendChild(checkDom)

let inputDom = document.createElement("div")
inputDom.classList.add("inputDom")
inputDom.innerHTML = `${infosPessoais.Nota}`
divDom.appendChild(inputDom)

let botaoDom = document.createElement("button")
botaoDom.classList.add("botaoDom")
botaoDom.setAttribute("type", "submit")
botaoDom.innerHTML = `<i class="fa-solid fa-trash"></i>`
/* Nessa função primeiramente estamos fazendo um aviso perguntando se o usuário quer ou não excluir
se ele dizer que não ele vai pro IF e não acontecera nd, já se ele apertar em sim ele vai ativar o ELSE
que vai fazer um loop que vai verificar cada slot do PegandoChave vendo se o nmrInd é igual ao infosPessoais.nmrInd 
do localstorage se for igual ele vai exclui usando splice, e depois disso ele vai redirecionar  para function criandoDom para 
atualizar já que um info foi excluida e vai excluir no localstorage e pro usuario */
botaoDom.onclick = function ExcluirRegistro(){

let confirmação =  confirm("Você tem certeza que quer excluir?")
  
if(!confirmação){ 
}else{
  for(let i = 0; i < pegandoChave.length; i++){
   if(pegandoChave[i].NmrInd == infosPessoais.NmrInd){
     pegandoChave.splice(i, 1)
   }
  }
  criandoDom() 
}} 
divDom.appendChild(botaoDom)
})
input.value = ``
}
criandoDom()

