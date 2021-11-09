const fs = require("fs");

module.exports = function (plop) {
	// controller generator
	plop.setGenerator("comp", {
		description: "Add component",
		prompts: [
			{
				type: "input",
				name: "name",
				message: "Component name:",
			},
			{
				type: "list",
				name: "directory",
				choices: function () {
					let choices = fs.readdirSync("./components");
					choices.push("Other");

					return choices;
				},
				message: "Where do you want it?",
			},
			{
				type: "input",
				name: "directory",
				message: "Other directory?",
				when: function (choices) {
					return choices["directory"] === "Other";
				},
			},
		],
		actions: [
			{
				type: "add",
				path: "components/{{directory}}/{{properCase name}}/{{properCase name}}.tsx",
				templateFile: ".dev/component.hbs",
			}
		],
	});
};
