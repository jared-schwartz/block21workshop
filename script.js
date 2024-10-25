/* const realPartyList = [
    {name: "Halloween Party", date: "10/31/2024", location: "Pineville, LA", 
        description: "Halloween party with all the seasonal events."},
    {name: "Gaming Meetup", date: "11/11/2024", location: "Honolulu, HI", 
        description: "Meetup with all your favorite gamers."},
    {name: "Taco Eating", date: "11/12/2024", location: "Baton Rouge, LA", 
        description: "Come eat all the tacos you can!!"},
];
*/
const realPartyList = [];

async function getParties() {
    const url = 'https://fsa-crud-2aa9294fe819.herokuapp.com/api/2408-FTB-MT-WEB-PT/events';
    const response = await fetch(url);

    if (!response.ok) {
        console.error('Network response was not ok:', response.statusText);
        return []; 
    }

    const obj = await response.json();
    console.log (obj.data);
    return obj.data;
}

async function renderrealParties() {
    const partyList = document.getElementById("party-list");
    partyList.innerHTML = '';
    const fetchedParties = await getParties();

    if (fetchedParties) {
        fetchedParties.forEach((ptList) => {
            const date = new Date(ptList.date);
            const formattedDate = date.toLocaleDateString();
            const formattedTime = date.toLocaleTimeString();
            const realPartiesElement = document.createElement("tr");
            realPartiesElement.innerHTML = ` 
                <td> ${ptList.name}</td> 
                <td> ${formattedDate}</td>
                <td> ${formattedTime}</td>
                <td> ${ptList.location}</td> 
                <td> ${ptList.description}</td>
                <td> <button id="${ptList.id}">DELETE</btn> 
            `;
            partyList.appendChild(realPartiesElement);
        });
    }
}
renderrealParties();