//||//
let input = document.querySelector(".input")
let botao = document.querySelector(".botao")
let mostrarDom = document.querySelector(".mostrarDom")

    
let tarefasSalvas = JSON.parse(localStorage.getItem("chaveTarefas")) || []

botao.addEventListener("click", (event)=>{
event.preventDefault()

if(input.value == ""){
 alert("Por favor preencha o campo.")
}
else{
    let objTarefa = {
        tarefa: input.value
    }
    
    let temNoLocal = false 
    
    tarefasSalvas.forEach(function(objTarefa){
         if(objTarefa.tarefa == input.value){
            alert("Tarefa já salva.")
            temNoLocal = true
         }
    })

    if(!temNoLocal){
        tarefasSalvas.push(objTarefa)
        localStorage.setItem("chaveTarefas", JSON.stringify(tarefasSalvas))
        varrendoTarefasSalvas()
        input.value = ""
    }
}
})


function varrendoTarefasSalvas(){
    mostrarDom.innerHTML = ""

    tarefasSalvas.forEach(function(objTarefa){
          criandoDom(objTarefa)
    })

}
varrendoTarefasSalvas()

function criandoDom(objTarefa){

let divDom = document.createElement("div")
divDom.classList.add("divDom")
mostrarDom.appendChild(divDom)

let checkDom = document.createElement("button")
checkDom.classList.add("checkDom")
checkDom.innerHTML = `<i class="fa-solid fa-check"></i>`

checkDom.onclick = function riscar(){

    if(objTarefa.marcado){
       delete objTarefa.marcado
       inputDom.classList.remove("riscar")
    }
    else{
       inputDom.classList.add("riscar")
       objTarefa.marcado = "marcado"
    }
      
    localStorage.setItem("chaveTarefas", JSON.stringify(tarefasSalvas))
}

divDom.appendChild(checkDom)


let inputDom = document.createElement("div")
inputDom.classList.add("inputDom")
inputDom.innerHTML = `${objTarefa.tarefa}`
divDom.appendChild(inputDom)

if(objTarefa.marcado){
    inputDom.classList.add("riscar")
}

let botaoDom = document.createElement("button")
botaoDom.classList.add("botaoDom")
botaoDom.setAttribute("type", "submit")
botaoDom.innerHTML = `<i class="fa-solid fa-trash"></i>`

botaoDom.onclick = function ExcluirRegistro(){

    for(let i = 0; i < tarefasSalvas.length; i++){
        if(tarefasSalvas[i].tarefa == objTarefa.tarefa){
            tarefasSalvas.splice(i, 1)
        }
    }

    localStorage.setItem("chaveTarefas", JSON.stringify(tarefasSalvas))
    varrendoTarefasSalvas()

} 

divDom.appendChild(botaoDom)
 
}

