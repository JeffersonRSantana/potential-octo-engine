// Seleciona os elementos do formulário.
const form = document.querySelector("form")
const amount = document.getElementById("amount")
const expense = document.getElementById("expense")
const category = document.getElementById("category")


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
  // Previne o comportamento padrão de recarregar a pagina
  event.preventDefault()

 // Cria um objeto com os detalhes da nova despesa
  const newExpence = {
    id: new Date().getTime(),
    expense: expense.value,
    category_id: category.value,
    category_name: category.options[category.selectedIndex].text,
    amount: amount.value,
    created_at: new Date(),
  }

}

function expenseAdd(newExpense){
  try {
// Cria o elemento para adicionar o item (Li) na lista (Ul).
const expenseItem = document.createElement("li")
expenseItem.classList.add("expense")


  }catch(error){
    alert("Não foi possivel atualizar a lista de despesas.")
    console.log(error)
  }
}