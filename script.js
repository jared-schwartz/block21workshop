const partyListBody = document.querySelector("#party-list tbody"); 


async function getEvents() {
    const url = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/2408-FTB-MT-WEB-PT/events`;
    const response = await fetch(url);

    if (!response.ok) {
        console.error("Failed to fetch events:", response.status);
        return [];  
    }

    const result = await response.json();
    console.log(result);  

    return result.data || [];  
}


async function renderEvents() {
    const events = await getEvents();  
    partyListBody.innerHTML = '';  

    if (Array.isArray(events) && events.length > 0) {
        const partiesElements = events.map((event) => {
            const partiesElement = document.createElement("tr");
            partiesElement.innerHTML = `
                <td>${event.name}</td> 
                <td>${new Date(event.date).toLocaleString()}</td> 
                <td>${event.location || 'N/A'}</td> 
                <td>${event.description}</td>
                <td><button data-id="${event.id}" class="delete-btn">Delete</button></td>
            `;
            return partiesElement;
        });

        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', deleteParty);
        });
    }
}
