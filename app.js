const BASE_URL = "https://dogs-backend.herokuapp.com/dogs";
const dogsContainer = document.querySelector(".dogs-container");
const dogForm = document.querySelector("#dog-form");

fetch(`${BASE_URL}`)
  .then(response => response.json())
  .then(dogs =>
    dogs.forEach(dog => {
      const dogCard = document.createElement("div");
      dogCard.innerHTML = `
        <div class="dog-info">
            <img src="${dog.image}" />
            <h1>Dog Name: ${dog.name}</h1>
            <h1>Breed: ${dog.breed}</h1>
            <h1>Age: ${dog.age}</h1>
        </div>
        `;
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "DELETE";
      dogCard.appendChild(deleteButton);
      deleteButton.addEventListener("click", () => {
        event.target.parentNode.remove();
        fetch(`${BASE_URL}/${dog.id}`, {
          method: "DELETE"
        });
      });
      const editDog = document.createElement("form");
      editDog.innerHTML = `
        <input type="number" id="age" name="age" value=${dog.age}>
        `;
      editDog.addEventListener("submit", () => {
        event.preventDefault();
        const newAge = document.getElementById("age").value;
        fetch(`${BASE_URL}/${dog.id}`, {
          method: "PATCH",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ age: newAge })
        });
      });
      dogCard.append(editDog, deleteButton);
      dogsContainer.appendChild(dogCard);
    })
  )
  .catch(console.error);

dogForm.addEventListener("submit", () => {
  event.preventDefault();

  const formData = new FormData(dogForm);
  const dogName = formData.get("name");
  const dogBreed = formData.get("breed");
  const dogImage = formData.get("image");
  const dogAge = formData.get("age");
  console.log(dogName, dogBreed, dogImage, dogAge);

  fetch(BASE_URL, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: dogName,
      breed: dogBreed,
      image: dogImage,
      age: dogAge
    })
  });
});
