//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
const { Configuration, OpenAIApi } = require ("openai");
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const configuration = new Configuration({
    organization: "org-ZOzi7QCOpgH37QwQSGs4gEyS",
    apiKey: "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",
});
const openai = new OpenAIApi(configuration);
// create a simple express api that calls the funcion above
const app = express()
app.use(bodyParser.json())
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended : true }))
const port = 3080
app.post('/', async (req,res) => {
    const { message } = req.body;
    const { currentModel } = req.body;
    console.log(message)
    console.log(currentModel)
    const response = await openai.createCompletion({
        model: `${currentModel}`,//"text-davinci-003",
        prompt: `${message}`,
        max_tokens: 300,
        temperature: 0.5,
      });
      res.json({
        message :response.data.choices[0].text,
      })
});
app.get('/models', async (req,res) => {
  const response = await openai.listEngines();
  console.log(response.data.data)
  res.json({
   models: response.data.data
  })
  
});
app.listen(port, () => {
  console.log(`Example app listening at https://localhost:${port}`)
});