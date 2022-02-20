const express = require('express')
const { v4: uuidV4 } = require('uuid')

const app = express()

app.use(express.json())

app.listen(3333)

const customers = []

function verifyIfAccountAlreadyExists(req, res, next) {
  const { cpf } = req.params

  const customer = customers.find((customer) => customer.cpf === cpf)

  if (!customer) {
    return res.status(400).json({ error: 'Cliente não encontrado!' })
  }

  req.customer = customer

  return next()
}

app.get('/statement/:cpf', verifyIfAccountAlreadyExists, (req, res) => {
  const { customer } = req

  return res.json(customer.statement)
})

app.post('/account', (req, res) => {
  const { name, cpf } = req.body

  const cpfAlreadyExists = customers.some((customer) => customer.cpf === cpf)

  if (cpfAlreadyExists) {
    return res.status(400).json({ error: 'CPF já existente!' })
  }

  customers.push({
    id: uuidV4(),
    name,
    cpf,
    statement: [],
  })

  return res.status(201).send('Conta criada com sucesso')
})
