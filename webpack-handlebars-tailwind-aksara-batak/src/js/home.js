const { convertToAksaraBatak } = require('./aksara');

var aksaraInput, aksaraOutput, aksaraForm, modal;

function isValid(str) {
    const regex = /^[a-zA-Z.-\s]+$/;
    return regex.test(str);
}

function initHome() {

    if (!aksaraInput) {
        aksaraInput = document.getElementById('aksara-input');
    }

    if (!aksaraOutput) {
        aksaraOutput = document.getElementById('aksara-output');
    }

    if (!aksaraForm) {
        aksaraForm = document.getElementById('aksara-form');
    }

    if (aksaraForm) {
        aksaraForm.addEventListener('submit', function (event) {
            event.preventDefault();

            if (aksaraInput && aksaraOutput) {
                if (isValid(aksaraInput.value)) {
                    convertToAksaraBatak(aksaraInput.value, aksaraOutput);
                } else {
                    common.showModal();
                }
            }

        });

        aksaraForm.addEventListener('reset', function (event) {
            event.preventDefault();

            if (aksaraInput) {
                aksaraInput.value = '';
            }
        
            if (aksaraOutput) {
                aksaraOutput.innerHTML = ''
            }

        });
    }

    if (aksaraInput && aksaraOutput) {
        aksaraInput.value = `Opunta sijolo-jolo tubu martungkot salagundi \nNapinungka ni na parjolo siihuthonon ni na parpudi`;
        convertToAksaraBatak(aksaraInput.value, aksaraOutput);
    }
}

document.addEventListener("DOMContentLoaded", function () {
    if (document.readyState === "interactive" || document.readyState === "complete") {
        initHome();
    }
});