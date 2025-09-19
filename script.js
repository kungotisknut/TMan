/* Copyright (c) 2025 Otis K
All rights reserved. */

document.addEventListener("DOMContentLoaded", () =>{
    const addEventBtn = document.getElementById("addEventBtn");
    const dayDivs = document.querySelectorAll(".days");

    const savedEvents = JSON.parse(localStorage.getItem("events")) || [];
    savedEvents.forEach(event => {
        renderEvent(event.day, event.time, event.subject, event.color);
    });

    addEventBtn.addEventListener("click", () => {
        const day = prompt("enter day").toLowerCase();
        const time = prompt("enter time");
        const subject = prompt("enter subject");
        const color = prompt("enter color (use no space forcolors like light blue)");

        if(!day || !time || !subject){
            alert("please fill in all fields");
            return;
        }

        const newEvent = {day, time, subject, color};
        savedEvents.push(newEvent);
        localStorage.setItem("events", JSON.stringify(savedEvents));

        renderEvent(day, time, subject, color);
    });

    function renderEvent(day, time, subject, color){
            dayDivs.forEach(div => {
                if (div.querySelector("h2").textContent.toLowerCase() === day) {
                    const newEvent = document.createElement("div");
                    newEvent.classList.add("event");
                    newEvent.textContent = `${time} ${subject}`;
                    newEvent.style.backgroundColor = color;
                    newEvent.style.fontFamily = "sans-serif"

                    newEvent.addEventListener("click", () => {
                        const confirmDelete = confirm("Do you want do delete this event?");
                        if(!confirmDelete) return;

                        const index = savedEvents.findIndex(e => 
                            e.day === day && e.time === time && e.subject === subject && e.color === color
                        );
                        if(index != -1){
                            savedEvents.splice(index, 1);
                            localStorage.setItem("events", JSON.stringify(savedEvents));
                        }

                        newEvent.remove();
                    });

                    div.appendChild(newEvent);
                }
            });
    }
});
