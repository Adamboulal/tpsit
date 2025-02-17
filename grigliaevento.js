function handleClick(cella) {

    let inputString = prompt(`Hai cliccato su ${cella}. Inserisci una stringa per calcolare il reverse:`);



    if (inputString !== null) {

        let reversedString = inputString.split("").reverse().join("");

        alert(`La stringa inversa è: ${reversedString}`);

    }

}

