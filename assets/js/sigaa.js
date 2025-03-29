/*
*  Função para extrair as informações das disciplinas.
*/
function scrap() {
    let disciplinas = document.getElementById("turmas-portal")?.children[2]?.children[1];
    if (disciplinas) {
        let resultObject = [];
        for (let element of disciplinas.children) {
            let texts = element?.innerText;
            if (texts) {
                let lines = texts.split("\n").map(text => text.trim()).filter(text => text.length > 0);
                if (lines.length > 0) {
                    let name = lines[0];
                    let location = lines[1];
                    let schedules = lines[2].split(" ");

                    resultObject.push({
                        name,
                        location,
                        schedules
                    })
                }
            }
        }
        return resultObject;
    }
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "scrap.sigaa") {
        const data = scrap();
        sendResponse({ payload: data });
    }
    return true; // Necessário para permitir resposta assíncrona
});


console.log(scrap())