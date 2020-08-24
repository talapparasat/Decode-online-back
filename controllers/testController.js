const db = require('../models');
var MyReporter = require('../services/reporter');
const jsdom = require("jsdom");
const {JSDOM} = jsdom;
var Mocha = require('mocha'),
    fs = require('fs');

const taskSolution = require('./taskController')

exports.main = async function (req, res) {
    var testDir = 'test/testTemp/' + Math.random() + 'in' + Date.now() + '.js';
    try {
        var taskId = req.body.taskId;
        var userId = req.user.id;
        var userSolution = req.body.data;
        var solution = await db.Task.findOne({where: {id: taskId}, attributes: ["solution"]});
        userSolution = userSolution.replace(/(\n)/gm, "").replace(/"/gm, '\\"');
        var content = '';
        await fs.readFile('test/' + solution.solution,
            async function (err, data) {

                content += await data.toString('utf8').replace("SarinovSarinov", userSolution);
                if (err) throw err;

                await fs.writeFile(testDir, content,
                    async function (err) {
                        if (err) throw err;
                        await delete require.cache[testDir];

                        var mocha = new Mocha({
                            reporter: MyReporter
                        });

                        await mocha.addFile(
                            (testDir)
                        );

                        var responser = MyReporter(async (response) => {
                            try {
                                if (response[response.length - 1].failures === 0)
                                    await taskSolution.main(taskId, userId, userSolution, (d) => {
                                        console.log(d);
                                        response[response.length - 1].chakra = d.chakra
                                        res.json(response);
                                    });
                                else {
                                    res.json(response);
                                }
                            } catch (e) {
                                console.error(e.message)
                            }
                        }, mocha.run());

                        fs.unlinkSync(testDir);

                    });
            });
    } catch (e) {
        fs.unlinkSync(testDir);
        res.json({error: e.message});
    }


};

exports.rendering_css = async function (req, res) {
    try {
        var data_from_user = req.body.data;
        var html = data_from_user.html;
        var css = data_from_user.css;
        const dom = new JSDOM(html);
        var node = dom.window.document.createElement("style");
        var textnode = dom.window.document.createTextNode(css);
        node.appendChild(textnode);
        dom.window.document.head.appendChild(node);
        var response = "<!DOCTYPE html> <html>" + dom.window.document.documentElement.innerHTML + "</html> ";
        res.json(response)
    } catch (e) {
        res.json({error: e.message});
    }


};