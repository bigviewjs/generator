
var ykit = require("ykit")

console.log(ykit.commands.server)

ykit.commands.server.run({
    cwd: process.cwd(),
    p: 8090
})

