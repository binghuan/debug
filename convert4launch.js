
function replaceAll(str, find, replace) {
    return str.replace(new RegExp(find, 'g'), replace);
}


let textfield = document.getElementById("textfield");
let outputfield = document.getElementById("output");

let btnConvert = document.getElementById("btn_convert");



btnConvert.onclick = () => {
    console.log("onclick");

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

    console.log("### OUTPUT: ");
    let result = "\"args\":" + JSON.stringify(args);
    console.log(result);
    outputfield.value = result
}

