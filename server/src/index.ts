import express from "express"
import { getDatabaseConnection } from "./database"

const PORT = process.env.PORT ?? 3000
const app = express()
app.use(express.json())

app.get("/", (req, res) => res.send("Hello World!"))

// BUSCAR DADOS
app.get("/item", async (req, res) => {
  const db = await getDatabaseConnection()
  const resp = await db.all("SELECT * FROM todo")
  res.json(resp)
})

app.get("/item/:id", async (req, res) => {
  const { id } = req.params
  const db = await getDatabaseConnection()
  const resp = await db.all("SELECT * FROM todo WHERE id=?", id)
  res.json(resp)
})

// CRIAR DADOS
app.post("/item", async (req, res) => {
  const { todo } = req.body
  const db = await getDatabaseConnection()
  const resp = await db.run("INSERT INTO todo (text, date) VALUES (?, ?)", todo, Date.now())
  res.json(resp)
})

// ATUALIZAR DADOS
app.put("/item/:id", async (req, res) => {
  const { todo } = req.body
  const { id } = req.params
  const db = await getDatabaseConnection()
  const resp = await db.run("UPDATE todo SET text = ? WHERE id = ?", todo, id)
  res.json(resp)
})

app.patch("/item/:id", async (req, res) => {
  const { id } = req.params
  const keys = Object.keys(req.body)
  const values = [...Object.values(req.body), id]
  const sql = `UPDATE todo SET ${keys.map(c => `${c}=?`).join(", ")} WHERE id=?`
  const db = await getDatabaseConnection()
  const resp = await db.run(sql, ...values)
  res.json(resp)
})

// DELETAR DADOS
app.delete("/item/:id", async (req, res) => {
  const { id } = req.params
  const db = await getDatabaseConnection()
  const resp = await db.run("DELETE FROM todo WHERE id = ?", id)
  res.json(resp)
})


app.listen(PORT, () => console.log(`⚡🔥 Server listening on port ${PORT}`))