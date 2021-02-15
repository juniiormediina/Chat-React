const app = require("./app");

require("./models/index.js");
require("./models/User.model").sync();
require("./models/Message.model").sync();

app.set("port", process.env.PORT || 4000);

app.listen(app.get("port"), () => {
  console.log("Server started...");
});
