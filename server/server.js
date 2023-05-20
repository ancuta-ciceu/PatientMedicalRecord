import app from './index.mjs';
const port = 5000;
app.listen(port, () => {
  //console.log('server has started on port ${port}');
  console.log(`Server listening on port ${port}`);
});
