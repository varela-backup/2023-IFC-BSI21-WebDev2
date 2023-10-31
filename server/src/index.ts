import express from "express"

const PORT = process.env.PORT ?? 3000
const app = express()

app.get("/", (req, res) => res.send("Hello World!"))

// BUSCAR DADOS
app.get("/item", (req, res) => {
  const { id } = req.query
  res.json({
    id,
    name: "Item",
  })
})

// CRIAR DADOS
app.post("/item", (req, res) => res.json("resposta post ok"))

// ATUALIZAR DADOS
app.put("/item", (req, res) => res.json("resposta put ok"))
app.patch("/item", (req, res) => res.json("resposta patch ok"))

// DELETAR DADOS
app.delete("/item", (req, res) => {
  const { id } = req.query

  if (!id) {
    res.status(400)
    res.json({
      error: "Missing id",
    })
    return
  }

  res.json({
    id,
    name: "Item",
  })
})




app.listen(PORT, () => console.log(`⚡ Server listening on port ${PORT}`))