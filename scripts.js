// Seleciona os elementos do formulário.
const form = document.querySelector("form")
const amount = document.getElementById("amount")
const expense = document.getElementById("expense")
const category = document.getElementById("category")

// Seleciona os elementos da lista.
const expenseList = document.querySelector("ul")
const expensesQuantity = document.querySelector("aside header p span")
const expensesTotal = document.querySelector("aside header h2")

//observa toda vez que entrar algum conteudo no input
amount.oninput = () => {
  // retirar letras e valida somente números
  let value = amount.value.replace(/\D/g, "")

  // transformar o valor em centavos (exemplo: 150/100=1.5 que é equivalente a R$1.50).
  value = Number(value) / 100

  // atualiza o valor do input
  amount.value = formatCurrencyBRL(value)
}

function formatCurrencyBRL(value){
  // Formata o valor no padrão BRL 
  value = value.toLocaleString("pt-BR",{
  style: "currency",
  currency: "BRL",
  })

    return value
}

// captura o evento de submit do formulario para obter os valores.
form.onsubmit = (event) => {
  // Previne o comportamento padrão de recarregar a página
  event.preventDefault()

  // Cria um objeto com os detalhes da nova despesa
  const newExpense = {
    id: new Date().getTime(),
    expense: expense.value,
    category_id: category.value,
    category_name: category.options[category.selectedIndex].text,
    amount: amount.value,
    created_at: new Date(),
  }

  // Chama a função para adicionar a despesa à lista
  expenseAdd(newExpense)
}

// Adiciona um novo  item na Lista
function expenseAdd(newExpense) {
  try {
    // Cria o elemento para adicionar o item (Li) na lista (Ul).
    const expenseItem = document.createElement("li")
    expenseItem.classList.add("expense")

    // Cria o icone da categoria.
    const expenseIcon = document.createElement("img")
    expenseIcon.setAttribute("src", `img/${newExpense.category_id}.svg`)
    expenseIcon.setAttribute("alt", newExpense.category_name)

    // Cria a info da despesa.
    const expenseInfo = document.createElement("div")
    expenseInfo.classList.add("expense-info")

    // Cria o nome da despesa
    const expenseName = document.createElement("strong")
    expenseName.textContent = newExpense.expense

    // Cria a categoria da despesa.
    const expenseCategory = document.createElement("span")
    expenseCategory.textContent = newExpense.category_name

    // Adiciona o nome e categoria na div das informações da despesa.
    expenseInfo.append(expenseName, expenseCategory)

    // Cria o valor da despesa.
    const expenseAmount = document.createElement("span")
    expenseAmount.classList.add("expense-amount")
    expenseAmount.innerHTML = `<small>R$</small>${newExpense.amount.toUpperCase().replace("R$", "")}`

    // Cria o icone de remover
    const removeIcon = document.createElement("img")
    removeIcon.classList.add("remove-icon")
    removeIcon.setAttribute("src", "img/remove.svg")
    removeIcon.setAttribute("alt", "remover")

    // Adiciona as informações no item.
    expenseItem.append(expenseIcon, expenseInfo, expenseAmount, removeIcon)

    // Adiciona o item na lista.
    expenseList.append(expenseItem)

    // Limpa o formulário para adicionar um novo item
    formClear()

    // Atualiza a lista
    updateTotals()


  } catch (error) {
    alert("Não foi possivel atualizar a lista de despesas.")
    console.log(error)
  }
}

// Atualiza os valores da lista
function updateTotals() {
  try {

    // Recupera todos os itens (li) e da (ul)
    const items = expenseList.children
    
    // Atualiza a quantidade de itens na lista.
    expensesQuantity.textContent = `${items.length} ${items.length > 1 ? "despesas" : "despesa"}`

    // variavel para incrementar o total
    let total = 0

    // Percorre cada item da (li) da lista (ul)
    for(let item = 0; item < items.length; item++){

      const itemAmount = items[item].querySelector(".expense-amount")

      // Remover caracteres não númeris e substituis a vírgula pelo ponto.
      let value = itemAmount.textContent.replace(/[^\d,]/g, "").replace(",",".")

      // Converte o valor para total
      value = parseFloat(value)

      // Verifica se é um número válido.
      if (isNaN(value)) {
        return alert ("Não foi possível calcular o total. O valor não parecer um número.")
      }
        // Incremetar o valor total.
        total += Number(value)

    }

    // Cria a span para adicionar o R$ formatado
    const symbolBRL = document.createElement("small")
    symbolBRL.textContent = "R$"

    // Formata o valor e remove o R$ que será exibido pela small com um estilo customizado.
    total = formatCurrencyBRL(total).toUpperCase().replace("R$", "")

    // Para limpar o conteúdo do elemento.
    expensesTotal.innerHTML = ""

    // Adiciona o símbulo da moeda e o valor total formatado
    expensesTotal.append(symbolBRL, total)

  } catch (error) {
    console.log(error)
    alert("Não foi possível atualizar os totais")
  }
}

// Evento que captura o clique nos itens da lista
expenseList.addEventListener("click", function(event){
   // verifica se o elemento é clicado é o ícone de remover.
   if(event.target.classList.contains("remove-icon")){

  //Obtém a li pai o elemento clicado.
    const item = event.target.closest(".expense")

    // Remove o item da lista
    item.remove()
 }
    // Atualiza os itens totais
    updateTotals()
})

function formClear(){
  // Limpa os inputs.
  expense.value = ""
  category.value = ""
  amount.value = ""

  // Coloca o focus no input de amount
  expense.focus()
}