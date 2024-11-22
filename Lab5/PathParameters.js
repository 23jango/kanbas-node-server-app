export default function PathParameters(app) {
  app.get("/lab5/add/:a/:b", (req, res) => {
    const { a, b } = req.params;
    const sum = parseInt(a) + parseInt(b);
    res.send(sum.toString());// sum as string sent back as response

  });
  app.get("/lab5/subtract/:a/:b", (req, res) => {
    const { a, b } = req.params;
    const sum = parseInt(a) - parseInt(b);
    res.send(sum.toString()); // subtraction as string sent back as response

  });
};
// response is converted to string otherwise browser
// would interpret integer response as a status code
