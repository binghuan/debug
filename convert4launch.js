
function replaceAll(str, find, replace) {
    return str.replace(new RegExp(find, 'g'), replace);
}


let textfield = document.getElementById("textfield");
let outputfield = document.getElementById("output");

let btnConvert = document.getElementById("btn_convert");

let args = [];

btnConvert.onclick = () => {
    console.log("onclick");

    // By lines
    let lines = textfield.value.split('\n');
    for (let i = 0; i < lines.length; i++) {
        let line = lines[i];
        let newLine = replaceAll(lines[i], "'", "").trim();
        console.log(`#${i}: ${newLine}`);
        args.push(newLine);
    }

    console.log("### OUTPUT: ");
    let result = "\"args:\"" +  JSON.stringify(args);
    console.log(result);
    outputfield.value = result
}

