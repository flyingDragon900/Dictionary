const container = document.querySelector(".container"),
    searchInput = container.querySelector("input"),
    infoText = container.querySelector(".info-text"),
    synonyms = container.querySelector(".synonyms .list"),
    volUp = container.querySelector(".volume_up"),
    clearSearch = container.querySelector(".close-icon");
let audio;

// Data function
function data(result, word) {
    if (result.title) {
        infoText.innerHTML = `Can't find the <span>"${word}"</span>. Please try a new word`
    } else {
        console.log(result);
        container.classList.add("active");

        let definitions = innerHTML = result[0].meanings[0].definitions[0]

        // Display dynamic data
        document.querySelector(".word p").innerHTML = result[0].word;
        document.querySelector(".word span").innerHTML = `${result[0].meanings[0].partOfSpeech} / ${result[0].phonetics[0].text}`;
        document.querySelector(".content span").innerHTML = definitions.definition
        document.querySelector(".example span").innerHTML = definitions.example
        // Creating a audio instance
        audio = new Audio("https://" + result[0].phonetics[0].audio)

        if (definitions.synonyms[0] == undefined) {
            synonyms.parentElement.style.display = "none"
        } else {
            synonyms.parentElement.style.display = "block"
            synonyms.innerHTML = "";
            // for looping synonyms
            for (let i = 0; i < 5; i++) {
                let tag = `<span onclick=search('${definitions.synonyms[i]}')>${definitions.synonyms[i]},</span>`
                synonyms.insertAdjacentHTML("beforeend", tag)
            }
        }
    }

}

// Search function
function search(word) {
    searchInput.value = word
    fetchApi(word)
}
//Fetch api function
const fetchApi = (word) => {
    infoText.style.color = "#000";
    infoText.innerHTML = `Searching the meaning of <span>"${word}"</span>`
    const DICTIONARY_API = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    fetch(DICTIONARY_API).then(res => res.json()).then(result => data(result, word));
}
// for listening keyboard event
searchInput.addEventListener('keyup', e => {
    if (e.key === 'Enter' && e.target.value) {
        fetchApi(e.target.value);
    }
})

// Adding evint listner and calling the function
volUp.addEventListener('click', () => {
    audio.play()
})

// Clear Search box
clearSearch.addEventListener('click', () => {
    searchInput.value = "";
    searchInput.focus();
})