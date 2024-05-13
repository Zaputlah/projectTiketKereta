const tickets = [
    { trainName: "Argo Bromo Anggrek", destination: "Surabaya", departureTimes: ["07:00", "13:00", "17:00", "20:00"], departureDay:["Senin", "Selasa", "Rabu", "Kamis", "Jum'at", "Sabtu", "Ahad"], price: 150000 },
    { trainName: "Gajayana", destination: "Malang", departureTimes: ["07:00", "13:00", "17:00", "20:00"],departureDay:["Senin", "Selasa", "Rabu", "Kamis", "Jum'at", "Sabtu", "Ahad"], price: 120000 },
    { trainName: "Serayu", destination: "Purwokerto", departureTimes: ["07:00", "13:00", "17:00", "20:00"], departureDay:["Senin", "Selasa", "Rabu", "Kamis", "Jum'at", "Sabtu", "Ahad"], price: 100000 },
    { trainName: "Progo", destination: "Yogyakarta", departureTimes: ["07:00", "13:00", "17:00", "20:00"], departureDay:["Senin", "Selasa", "Rabu", "Kamis", "Jum'at", "Sabtu", "Ahad"], price: 80000 }
];

const searchInput = document.getElementById("searchInput");
const ticketList = document.getElementById("ticketList");

function displayTickets(ticketsToShow) {
    ticketList.innerHTML = "";
    ticketsToShow.forEach(ticket => {
        const ticketCard = document.createElement("div");
        ticketCard.classList.add("ticket-card");
        ticketCard.innerHTML = `
            <h3>${ticket.trainName}</h3>
            <p>Destination: ${ticket.destination}</p>
            <p>Price: Rp ${ticket.price}</p>
            <button onclick="reserveTicket('${ticket.trainName}')">Pilih</button>
        `;
        ticketList.appendChild(ticketCard);
    });
}

function searchTickets() {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredTickets = tickets.filter(ticket => {
        return ticket.trainName.toLowerCase().includes(searchTerm) || ticket.destination.toLowerCase().includes(searchTerm);
    });
    displayTickets(filteredTickets);
}

function reserveTicket(trainName) {
    const selectedTicket = tickets.find(ticket => ticket.trainName === trainName);
    if (selectedTicket) {
        const departureSelect = createDepartureSelect(selectedTicket.departureTimes);
        const daySelect = createDaySelect(selectedTicket.departureDay);
        // console.log(departureSelect); // Tambahkan ini untuk memeriksa departureSelect
        // console.log(daySelect); // Tambahkan ini untuk memeriksa daySelect
        // console.log(confirmReservation);

        const popup = document.createElement("div");
        popup.classList.add("popup");
        popup.innerHTML = `
            <h3>Pilih waktu dan hari keberangkatan untuk tiket kereta ${selectedTicket.trainName} ke ${selectedTicket.destination}:</h3>
            <div>
                <label for="departureTime" >Jam keberangkatan:</label>
                ${departureSelect.outerHTML}
            </div>
            <div>
                <label for="departureDay">Hari keberangkatan:</label>
                ${daySelect.outerHTML}
            </div>

            <button onclick="confirmReservation('${selectedTicket.trainName}', '${selectedTicket.destination}')">Pesan</button>
            <button onclick="closePopup()">Batal</button>
        `;
        document.body.appendChild(popup);
        // console.log("Popup created:", popup);
    } else {
        const errorMessage = "Tiket tidak ditemukan.";
        displayConfirmationMessage(errorMessage);
    }
}

function confirmReservation(trainName, destination) {
    const selectedTimeElement = document.querySelector(".popup #departureTime");
    const selectedDayElement = document.querySelector(".popup #departureDay");

    // console.log(departureDay);
    // console.log(selectedTimeElement); // Memeriksa elemen waktu keberangkatan
    // console.log(selectedDayElement); // Memeriksa elemen hari keberangkatan

    if (selectedTimeElement && selectedDayElement) {
        const selectedTime = selectedTimeElement.value;
        const selectedDay = selectedDayElement.value;
        
        if (selectedTime && selectedDay) {
            const selectedTicket = tickets.find(ticket => ticket.trainName === trainName && ticket.departureTimes.includes(selectedTime));
            if (selectedTicket && selectedTicket.departureDay.includes(selectedDay)) {
                const confirmationMessage = `Anda telah memesan tiket kereta ${selectedTicket.trainName} ke ${destination} pada jam ${selectedTime} pada hari ${selectedDay} dengan harga Rp ${selectedTicket.price}.`;
                displayConfirmationMessage(confirmationMessage);
                closePopup();
                return;
            }
        }
        const errorMessage = "Waktu atau hari keberangkatan tidak valid atau dibatalkan.";
        displayConfirmationMessage(errorMessage);
    } else {
        // Tampilkan pesan kesalahan jika elemen-elemen tidak ditemukan
        const errorMessage = "Elemen waktu atau hari keberangkatan tidak ditemukan.";
        displayConfirmationMessage(errorMessage);
    }
}

function createDepartureSelect(departureTimes) {
    const select = document.createElement("select");
    select.id = "departureTime"; 
    departureTimes.forEach(time => {
        const option = document.createElement("option");
        option.value = time;
        option.textContent = time;
        select.appendChild(option);
    });
    return select;
}


function createDaySelect(departureDayOptions) {
    const select = document.createElement("select");
    select.id = "departureDay";
    departureDayOptions.forEach(day => {
        const option = document.createElement("option");
        option.value = day;
        option.textContent = day;
        select.appendChild(option);
    });
    return select;
}


function closePopup() {
    const popup = document.querySelector(".popup");
    if (popup) {
        popup.remove();
    }
}


function displayConfirmationMessage(message) {
    const confirmationContainer = document.getElementById("confirmationContainer");
    // console.log(confirmationContainer);
    confirmationContainer.innerText = message;
    confirmationContainer.style.display = "block";
}

// Display all tickets on page load
displayTickets(tickets);

// Event listener for search input
searchInput.addEventListener("input", searchTickets);
