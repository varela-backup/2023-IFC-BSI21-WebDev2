import express from "express"

const PORT = process.env.PORT ?? 3000
const app = express()

app.get("/", (req, res) => res.send("Hello World!"))
app.get("/test", (req, res) => res.send("Teste --- Hello World!"))


app.listen(PORT, () => console.log(`⚡ Server listening on port ${PORT}`))