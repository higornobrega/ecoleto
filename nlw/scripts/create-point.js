function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]");
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then(res => res.json())
        .then(states => {
            for (const state of states) {
                ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
            }
        });
}

populateUFs();

function getCities(event) {
    const citySelect = document.querySelector("select[name=city");
    const stateInput = document.querySelector("input[name=state");
    const ufValue = event.target.value;
    const indexOfSelectedState = event.target.selectedIndex;
    stateInput.value = event.target.options[indexOfSelectedState].text;
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`
    citySelect.innerHTML = "<option value> Selcione sua cidade</option>"
    citySelect.disabled = true;
    fetch(url)

    .then(res => res.json())
        .then(cities => {
            for (const city of cities) {
                citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
            }
            citySelect.disabled = false;
        });
}

document.querySelector("select[name=uf]")
    .addEventListener("change", getCities);

const itensToCollect = document.querySelectorAll(".itens-grid li");

for (let item of itensToCollect) {
    item.addEventListener("click", handleSelectedItem);
}

const collectedItems = document.querySelector("input[name=itens]");

let selectedItens = [];

function handleSelectedItem(event) {
    const itemLi = event.target;
    //Adicionar ou remover classe com JavaScript
    itemLi.classList.toggle("selected");

    const itemId = itemLi.dataset.id;


    //Verificar se existe itens selecionado, se sim
    //Pegar os itens selecionados

    const alreadySeleted = selectedItens.findIndex(item => {
        const itemFund = item == itemId //Isso será true ou false
        return itemFund;
    });

    //Se já estiver selecionado
    if (alreadySeleted >= 0) {
        //Tirar da seleção
        const filteredItens = selectedItens.filter(item => {
            const itemIsDifferent = item != itemId //False
            return itemIsDifferent;
        });
        selectedItens = filteredItens;
    } else {
        // Se não estiver selecionado
        // Adicionar à seleção
        selectedItens.push(itemId);
    }
    collectedItems.value = selectedItens;

}