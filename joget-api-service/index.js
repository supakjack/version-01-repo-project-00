const express = require('express')
const createError = require('http-errors')

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const authRoute = require('./routers/authRoute')
const accountRoute = require('./routers/accountRoute')


app.use('/auth', authRoute)
app.use('/account', accountRoute)


app.use(async (req, res, next) => {
  next(createError.NotFound())
})

app.use((err, req, res, next) => {
  if (err.isJoi === true) err.status = 422
  res.status(err.status || 500)
  res.send({
    error: {
      status: err.status || 500,
      message: err.message
    }
  })
})

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
