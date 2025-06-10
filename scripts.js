// Seleciona os elementos do formulário.
const form = document.getElementById("form")
const amount = document.getElementById("amount")
const expense = document.getElementById("expence")
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

