
function replaceAll(str, find, replace) {
    return str.replace(new RegExp(find, 'g'), replace);
}


let textfield = document.getElementById("textfield");
let outputfield = document.getElementById("output");

let btnConvert4launch = document.getElementById("btn_convert");
let btnConvert2cli = document.getElementById("btn_convert2");

function getArgs() {
    let args = [];

    // By lines
    let lines = textfield.value.split('\n');
    for (let i = 0; i < lines.length; i++) {
        let line = replaceAll(lines[i], "',", "").trim();
        if (line.startsWith("'")) {
            line = line.replace("'", "");
        }
        if (line.endsWith("'")) {
            line = line.substring(line, line.length - 1);
        }
        console.log(`#${i}: ${line}`);
        args.push(line);
    }

    return args;
}

btnConvert4launch.onclick = () => {
    console.log("btnConvert4launch");
    console.log("### OUTPUT: ");
    let result = "\"args\":" + JSON.stringify(getArgs());
    console.log(result);
    outputfield.value = result
}

btnConvert2cli.onclick = () => {
    console.log("btnConvert2cli");
    console.log("### OUTPUT: ");
    let parameters = getArgs();
    let result = "";
    for (let i = 0; i < parameters.length; i++) {
        result += ` '${parameters[i]}'`;
    }

    console.log(result);
    outputfield.value = result
}

