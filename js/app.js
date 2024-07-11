let amigos = [];
let selecionados = [];

function adicionar() {
    let nome = document.getElementById('nome-amigo').value.trim();
    if(nome === ''){
        alert('Digite algum nome!');
        return false;
    } else if(amigos.includes(nome)){
        alert(`O nome ${nome} já existe!`);
        return false;
    }
    amigos.push(nome);
    document.getElementById('lista-amigos').textContent = amigos;
    let nomes = document.getElementById('nome-amigo');
    nomes.value = '';
    nomes.focus();
}


function sortear(){
    if(amigos.length < 4){
        alert('lista muito curta, mínimo 4 nomes');
        return;
    }
    embaralhar(amigos);
    let sorteio = document.getElementById('lista-sorteio');

    for(let i = 0; i < amigos.length; i++){
        if(i == amigos.length - 1){
            sorteio.innerHTML += amigos[i] + ' --> ' + amigos[0] + '<br>';
        }else{
            sorteio.innerHTML += amigos[i] + ' --> ' + amigos[i + 1] + '<br>';
        }
    }  
}

function embaralhar(lista) {
    for (let indice = lista.length; indice; indice--) {
        const indiceAleatorio = Math.floor(Math.random() * indice);
        [lista[indice - 1], lista[indiceAleatorio]] = [lista[indiceAleatorio], lista[indice - 1]];
    }
}

function reiniciar(){
    document.getElementById('lista-amigos').innerHTML = '';
    amigos = [];
    document.getElementById('lista-sorteio').innerHTML = '';
}

function remover(){
    let posicao;
    for(let id of selecionados){
        let element = document.getElementById(id);
        if(element){
            element.remove();
            console.log(id);
            posicao = id.split('-');
            amigos.splice(posicao[1],1);
        }
    }

    document.getElementById('lista-amigos').textContent = amigos;
    document.getElementById('lista-sorteio').innerHTML = '';
    selecionados = [];
    
}

function addModal(){
    let modal = document.getElementById('remocao');
    
    for(let i = 0; i < amigos.length; i++){
        modal.innerHTML += `<p id="amigo-${i}">${amigos[i]}</p>`;
        }
    
    for (let i = 0; i < amigos.length; i++) {
        let tag = document.querySelector(`#amigo-${i}`);
        tag.addEventListener('click', function(){
            tag.style.color = 'red'; 
            if(!selecionados.includes(tag.id)){
                selecionados.push(tag.id);
            }else {
                selecionados.pop(tag.id);
                tag.style.color = 'black';
            }
        });
    }    
}



function abrirModal(){
    const modal = document.getElementById('janela-modal');
    modal.classList.add('abrir');
    addModal();
}

function fecharModal(){
    const modal = document.getElementById('janela-modal');
        //add evento de fechar a janela em caso de clique fora ou no 'X'
    modal.addEventListener('click', (e) => {
        if(e.target.id == 'fechar' || e.target.id == 'janela-modal'){
            modal.classList.remove('abrir');
            document.getElementById('remocao').textContent = '';
        }
    })
    
}