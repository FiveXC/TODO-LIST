//||//
let aviso = document.querySelector(".aviso")
let input = document.querySelector(".input")
let botao = document.querySelector(".botao")
let mostrarDom = document.querySelector(".mostrarDom")

let tarefasSalvas = JSON.parse(localStorage.getItem("chaveTarefasSalvas")) || []

botao.addEventListener("click", (event)=>{
    event.preventDefault();
if(!input.value){
aviso.innerHTML = "Preencha os campos"
}
else{

let temNoLocal = false 
 
for(let i=0; i< tarefasSalvas.length; i++){
    if(tarefasSalvas[i].tarefa === input.value){
        alert("Tarefa já existe.")
        input.value = ""
        temNoLocal = true
    }
}
if(!temNoLocal){
    aviso.innerHTML = ``
    let tarefas = {
        tarefa: input.value
    }    
    tarefasSalvas.push(tarefas)
    localStorage.setItem("chaveTarefasSalvas", JSON.stringify(tarefasSalvas))
    varrendoTarefasSalvas()
    input.value = ""
}
 
}


})


function varrendoTarefasSalvas(){
mostrarDom.innerHTML = ``

 tarefasSalvas.forEach(function(objetos){
    exibindoTarefas(objetos)
   
 })
    
}
varrendoTarefasSalvas()

function exibindoTarefas(objetos){

let divDom = document.createElement("div")
divDom.classList.add("divDom")
mostrarDom.appendChild(divDom)

let checkDom = document.createElement("button")
checkDom.classList.add("checkDom")
checkDom.innerHTML = `<i class="fa-solid fa-check"></i>`

checkDom.onclick = function riscar(){

tarefasSalvas.forEach(function(tarefasSalvas){

    if(tarefasSalvas.tarefa == objetos.tarefa){
        if(tarefasSalvas.marcado){
            delete tarefasSalvas.marcado
            inputDom.classList.remove("riscar")
        }
        else{
            inputDom.classList.add("riscar")
            tarefasSalvas.marcado = "marcado"
        }
      
    }

})
localStorage.setItem("chaveTarefasSalvas", JSON.stringify(tarefasSalvas))
}
divDom.appendChild(checkDom)


let inputDom = document.createElement("div")
inputDom.classList.add("inputDom")
inputDom.innerHTML = `${objetos.tarefa}`
divDom.appendChild(inputDom)

if(objetos.marcado){
    inputDom.classList.add("riscar")
}

let botaoDom = document.createElement("button")
botaoDom.classList.add("botaoDom")
botaoDom.setAttribute("type", "submit")
botaoDom.innerHTML = `<i class="fa-solid fa-trash"></i>`

botaoDom.onclick = function ExcluirRegistro(){

for(let i = 0; i < tarefasSalvas.length; i++){
    if(tarefasSalvas[i].tarefa == objetos.tarefa){
        tarefasSalvas.splice(i, 1)
    }
 
}
  localStorage.setItem("chaveTarefasSalvas", JSON.stringify(tarefasSalvas))
  varrendoTarefasSalvas()
} 
divDom.appendChild(botaoDom)
 
}
