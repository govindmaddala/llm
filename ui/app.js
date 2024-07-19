const nextButton = document.getElementById("next")
const downloadButton = document.getElementById("download")
nextButton.style.display = "none"
downloadButton.style.display = "none"
let i = 0;
let rawCount;
var table = document.getElementById("table");

const callLlmMFirstTime = () => {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:5000/llmreq', true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
            const compareButton = document.getElementById("compare")
            compareButton.style.display = "none"
            nextButton.style.display = "block"
            var response = JSON.parse(xhr.responseText);
            console.log(response);
            rawCount = response.totalChanges;
        } else {
            console.error('Error: ' + xhr.statusText);
        }
    };
    xhr.onerror = function () {
        console.error('Network error');
    };
    const payload = JSON.stringify({
        data: "",
        i: 0
    });
    xhr.send(payload);
}

const callLlmMNextTime = () => {
    var newRow = table.insertRow();
    if (i < rawCount) {
        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://localhost:5000/llmreq', true);
        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.onload = function () {
            if (xhr.status >= 200 && xhr.status < 300) {
                i = i + 1;
                if (i === rawCount) {
                    nextButton.style.display = "none";
                    downloadButton.style.display = "block";
                }
                var cell1 = newRow.insertCell(0);
                var cell2 = newRow.insertCell(1);

                // Set the text content of the cells with dummy data
                cell1.textContent = "Dummy Data 2";
                cell2.textContent = "Dummy Data 3";
            } else {
                console.error('Error: ' + xhr.statusText);
            }
        };
        xhr.onerror = function () {
            console.error('Network error');
        };
        // Prepare the payload data
        const payload = JSON.stringify({
            data: "",
            i
        });
        xhr.send(payload);
    }
}
