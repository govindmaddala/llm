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
                var cell3 = newRow.insertCell(2);
                var response = JSON.parse(xhr.responseText);

                cell1.textContent = i;
                cell2.textContent = response.tableData.col1;
                cell3.textContent = response.tableData.col2;
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

function downloadTableAsPDF1() {
    // Get the table element
    var table = document.getElementById("table");

    // Initialize jsPDF
    var { jsPDF } = window.jspdf;
    var doc = new jsPDF();

    // Get the table rows
    var rows = table.rows;

    // Loop through the table rows
    for (var i = 0; i < rows.length; i++) {
        // Get the cells of the current row
        var cells = rows[i].cells;

        // Loop through the cells of the current row
        for (var j = 0; j < cells.length; j++) {
            // Add cell text to the PDF
            doc.text(cells[j].innerText, 10 + (j * 40), 10 + (i * 10));
        }
    }

    // Save the generated PDF
    doc.save('table.pdf');
}


function downloadTableAsPDF() {
    // Get the table element
    var table = document.getElementById("table");
    
    // Use html2pdf.js to convert the table to a PDF
    html2pdf().from(table).save('table.pdf');
}
