//Select DOM
const tagInput = document.querySelector(".tag-input");
const tagButton = document.querySelector(".tag-button");
const tagList = document.querySelector(".tag-list");
const filterMode = document.querySelector(".mode-tag");
const addButton = document.querySelector(".tag-button");
let isReadOnlyMode = false;

//Event Listeners
document.addEventListener("DOMContentLoaded", getTagList);
tagButton.addEventListener("click", addTag);
tagList.addEventListener("click", deleteTag);
filterMode.addEventListener("click", modeTag);

//Functions

function addTag(e) {
  //Prevent natural behaviour
  e.preventDefault();
  if (!isReadOnlyMode) {
    //Create tag div
    const tagDiv = document.createElement("div");
    tagDiv.classList.add("tag");
    //Create list
    const newTag = document.createElement("li");
    newTag.innerText = tagInput.value;
    //Save to local - do this last
    //Save to local
    saveLocalTags(tagInput.value);
    //
    newTag.classList.add("tag-item");
    tagDiv.appendChild(newTag);
    tagInput.value = "";
    //Create trash button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
    trashButton.classList.add("trash-btn");
    tagDiv.appendChild(trashButton);
    //attach final Tag
    tagList.appendChild(tagDiv);
  }
}

function deleteTag(e) {
  const item = e.target;

  if (item.classList[0] === "trash-btn" && !isReadOnlyMode) {
    // e.target.parentElement.remove();
    const tag = item.parentElement;
    tag.classList.add("fall");
    //at the end
    removeLocalTags(tag);
    tag.addEventListener("transitionend", e => {
      tag.remove();
    });
  }
}

function modeTag(e) {
  const tags = tagList.childNodes;
  tags.forEach(function(tag) {
    switch (e.target.value) {
      case "readonly-off":
        tag.classList.remove("readonly");
        isReadOnlyMode = false;
        break;
      case "readonly-on":
        tag.classList.add("readonly");
        isReadOnlyMode = true;
        break;
    }
  });
  isReadOnlyMode ? addButton.classList.add("readonly") : addButton.classList.remove("readonly");
}

function saveLocalTags(tag) {
  let tags;
  if (localStorage.getItem("tags") === null) {
    tags = [];
  } else {
    tags = JSON.parse(localStorage.getItem("tags"));
  }
  tags.push(tag);
  localStorage.setItem("tags", JSON.stringify(tags));
}
function removeLocalTags(tag) {
  let tags;
  if (localStorage.getItem("tags") === null) {
    tags = [];
  } else {
    tags = JSON.parse(localStorage.getItem("tags"));
  }
  const tagIndex = tag.children[0].innerText;
  tags.splice(tags.indexOf(tagIndex), 1);
  localStorage.setItem("tags", JSON.stringify(tags));
}

function getTagList() {
  let tags;
  if (localStorage.getItem("tags") === null) {
    tags = [];
  } else {
    tags = JSON.parse(localStorage.getItem("tags"));
  }
  tags.forEach(function(tag) {
    //Create tag div
    const tagDiv = document.createElement("div");
    tagDiv.classList.add("tag");
    //Create list
    const newTag = document.createElement("li");
    newTag.innerText = tag;
    newTag.classList.add("tag-item");
    tagDiv.appendChild(newTag);
    tagInput.value = "";
    //Create trash button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
    trashButton.classList.add("trash-btn");
    tagDiv.appendChild(trashButton);
    //attach final Tag
    tagList.appendChild(tagDiv);
  });
}