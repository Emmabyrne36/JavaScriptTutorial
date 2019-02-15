function hideDiv() {
  document.getElementById("text").style.display = "none";
}

function hideSelf(event) {
  event.srcElement.style.display = "none";
}

function moveBall(event) {
  // window-relative field coordinates
  let fieldCoords = event.srcElement.getBoundingClientRect();

  // the ball has position:absolute, the field: position:relative
  // so ball coordinates are relative to the field inner left-upper corner
  let ballCoords = {
    top: event.clientY - fieldCoords.top - field.clientTop - ball.clientHeight / 2,
    left: event.clientX - fieldCoords.left - field.clientLeft - ball.clientWidth / 2
  };

  // prevent crossing the top field boundary
  if (ballCoords.top < 0) ballCoords.top = 0;

  // prevent crossing the left field boundary
  if (ballCoords.left < 0) ballCoords.left = 0;

  // prevent crossing the right field boundary
  if (ballCoords.left + ball.clientWidth > field.clientWidth) {
    ballCoords.left = field.clientWidth - ball.clientWidth;
  }

  // prevent crossing the bottom field boundary
  if (ballCoords.top + ball.clientHeight > field.clientHeight) {
    ballCoords.top = field.clientHeight - ball.clientHeight;
  }

  ball.style.left = ballCoords.left + "px";
  ball.style.top = ballCoords.top + "px";
}

function showHide() {
  let listMenu = document.getElementById("listMenu");
  if (listMenu.style.display === "none") {
    listMenu.style.display = "block";
  } else {
    listMenu.style.display = "none";
  }
}

function removeP(event) {
  let parent = event.srcElement.parentNode;
  parent.remove();
}

// alternative is to use querySelector and get all the panes, insert the X and add the event listener
// this method means the p can be removed with the onclick

function removePane() {
  let panes = document.querySelectorAll(".pane");

  for (let pane of panes) {
    pane.insertAdjacentHTML(
      "afterbegin",
      '<button class="remove-button">[x]</button>'
    );
    // button becomes the first child of pane
    pane.firstChild.onclick = () => pane.remove();
  }
}

// removePane();

function carousel() {
  let carousel = document.getElementsByClassName("carousel")[0];
  /* label the images, just for convenience, to visually track them */
  let i = 1;
  for (let li of carousel.querySelectorAll("li")) {
    li.style.position = "relative";
    li.insertAdjacentHTML(
      "beforeend",
      `<span style="position:absolute;left:0;top:0">${i}</span>`
    );
    i++;
  }

  /* configuration */
  let width = 130; // image width
  let count = 3; // visible images count

  let list = carousel.querySelector("ul");
  let listElems = carousel.querySelectorAll("li");

  let position = 0; // ribbon scroll position

  carousel.querySelector(".prev").onclick = function () {
    // shift left
    position += width * count;
    // can't move to the left too much, end of images
    position = Math.min(position, 0);
    list.style.marginLeft = position + "px";
  };

  carousel.querySelector(".next").onclick = function () {
    // shift right
    position -= width * count;
    // can only shift the ribbbon for (total ribbon length - visible count) images
    position = Math.max(position, -width * (listElems.length - count));
    list.style.marginLeft = position + "px";
  };
}

carousel();

// ===============================================================================
// Event Delegation
// ===============================================================================
// If there are several events handled in a similar way, can put a common handler on their ancestor.

// Event delegation on Horse, Donkey, Cat pane
function delegationExample() {
  let container = document.getElementById("paneContainer");
  container.onclick = function (event) {
    if (event.target.className != "remove-button") return;
    let pane = event.target.closest(".pane");
    console.log(pane);
    pane.remove();
  };
}

delegationExample();

function treeDelegationExample() {
  // move all text into <span>
  // they occupy exactly the place necessary for the text,
  for (let li of tree.querySelectorAll("li")) {
    let span = document.createElement("span");
    li.prepend(span);
    span.append(span.nextSibling); // move the text node into span
  }

  // catch clicks on whole tree
  tree.onclick = function (event) {
    if (event.target.tagName != "SPAN") {
      return;
    }

    let childrenContainer = event.target.parentNode.querySelector("ul");
    if (!childrenContainer) return; // no children

    childrenContainer.hidden = !childrenContainer.hidden;
  };
}

treeDelegationExample();

function sortableTable() {
  let sortTbl = document.getElementById("grid");
  // Only add click to th elements
  // let id = event.target.dataset.toggleId;
  sortTbl.onclick = function (e) {
    if (e.target.tagName != "TH") return;

    let th = e.target;
    // if TH, then sort
    // cellIndex is the number of th:
    //   0 for the first column
    //   1 for the second column, etc
    sortGrid(th.cellIndex, th.dataset.type);
  };

  function sortGrid(colNum, type) {
    let tbody = grid.querySelector("tbody");
    let rowsArray = Array.from(tbody.rows);
    // compare(a, b) compares two rows, need for sorting
    let compare;

    switch (type) {
      case "number":
        compare = function (rowA, rowB) {
          return rowA.cells[colNum].innerHTML - rowB.cells[colNum].innerHTML;
        };
        break;
      case "string":
        compare = function (rowA, rowB) {
          return rowA.cells[colNum].innerHTML > rowB.cells[colNum].innerHTML ?
            1 :
            -1;
        };
        break;
    }

    // sort
    rowsArray.sort(compare);
    tbody.append(...rowsArray);
  }
}

sortableTable();

function greenEvent(event) {
  let current = event.target;

  if (event.ctrlKey === true) {
    // Toggle green
    current.classList.toggle("green");
  } else {
    singleClick(current);
  }
}

function singleClick(current) {
  let elements = Array.from(current.parentNode.children); // create an array
  let elem = elements.filter(li => Array.from(li.classList).includes('green'))[0];
  let i = elements.indexOf(elem);
  if (i !== -1) {
    elements[i].classList.remove("green");
  }
  current.classList.add("green");
}


function slider() {
  let slider = document.getElementById('slider');
  let thumb = slider.querySelector('.thumb');

  thumb.onmousedown = function (event) {
    event.preventDefault(); // prevent selection start (browser action)

    let shiftX = event.clientX - thumb.getBoundingClientRect().left;
    // shiftY not needed, the thumb moves only horizontally

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    function onMouseMove(event) {
      let newLeft = event.clientX - shiftX - slider.getBoundingClientRect().left;

      // the pointer is out of slider => lock the thumb within the bounaries
      if (newLeft < 0) {
        newLeft = 0;
      }
      let rightEdge = slider.offsetWidth - thumb.offsetWidth;
      if (newLeft > rightEdge) {
        newLeft = rightEdge;
      }

      thumb.style.left = newLeft + 'px';
    }

    function onMouseUp() {
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mousemove', onMouseMove);
    }

  };

  thumb.ondragstart = function () {
    return false;
  };
}

slider();

function selectedValue() {
  let genres = document.getElementById('genres');
  let selectedOption = genres.options[genres.selectedIndex];
  console.log(selectedOption);

  let option = new Option("Classic", "classic");
  genres.append(option);
  option.selected = true;
}

selectedValue();

function editDiv() {
  let switchDiv = document.getElementById('switchContent');
  let textArea = document.createElement('textarea');
  switchDiv.onclick = function () {
    textArea.className = 'form-control';
    textArea.value = switchDiv.innerHTML;
  
    textArea.onkeydown = function (event) {
      if (event.key === 'Enter') {
        this.blur();
      }
    };
  
    textArea.onblur = function () {
      editEnd();
    };
  
    switchDiv.replaceWith(textArea);
    textArea.focus();
  
    function editEnd() {
      switchDiv.innerHTML = textArea.value;
      textArea.replaceWith(switchDiv);
    }
  };
}

editDiv();