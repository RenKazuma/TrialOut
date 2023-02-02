function createBubbles(){
  const section = document.querySelector('.circleMama');
  const createElement = document.createElement('span');
  var size = Math.random() * 80;

  createElement.classList.add('circle');
  createElement.style.width = 20 + size + 'px';
  createElement.style.height = 20 + size + 'px';

  createElement.style.left = Math.random() * innerWidth + "px";
  
  section.appendChild(createElement);

  setTimeout(() => {
      createElement.remove()
  },50000);
}

function removeActiveClass(expander, content) {
  expander.classList.remove("active");
  content.classList.remove("active");
}

function addActiveClass(expander, content) {
  expander.classList.add("active");
  content.classList.add("active");
}

function ExpanderToggle(currentExpander){
  const expanders = document.querySelectorAll('.expander');
  const contents = document.querySelectorAll('.content');

  for(i = 0; i < expanders.length; i++){
      removeActiveClass(expanders[i], contents[i]);
  };

  for(i = 0; i < expanders.length; i++){
      if(expanders[i] === currentExpander){
          addActiveClass(currentExpander, contents[i]);
      }
  }

}

function AddExpander(){
  const section = document.querySelector('.ToDoListPapa');
  const expanderButton = document.createElement('button');
  const expanderContent = document.createElement('div');
  const nonNumberedList = document.createElement('ul');
  //const listItem = document.createElement('li');

  expanderButton.classList.add('expander');
  expanderContent.classList.add('content');

  var button_content = prompt('Enter a name');
  if(button_content)expanderButton.textContent = button_content;

  //nonNumberedList.appendChild(listItem);
  expanderContent.appendChild(nonNumberedList);
  section.appendChild(expanderButton);
  section.appendChild(expanderContent);

  expanderButton.addEventListener('click', function() {
    ExpanderToggle(expanderButton);
  })
}

function AddKeyPoint(){
  var expanderIndex = window.prompt('To which Expander?');

  var parseInta  = parseInt(expanderIndex);
  if (isNaN(parseInta)) {
    alert('Invalid input');
    return;
  }
  parseInta -= 1;

  const expanderContent = document.querySelectorAll('.content');

  if (parseInta >= expanderContent.length) {
    alert('Expander not found');
    return;
  }
  const selectedExpanderContent = expanderContent[parseInta];
  const nonNumberedList = selectedExpanderContent.querySelector('ul');
  const newListItem = document.createElement('li');


  var listText = window.prompt('Which text?');

  newListItem.textContent = listText;
  nonNumberedList.appendChild(newListItem);

}

function DeleteKeyPoint(){

  var expanderIndex = window.prompt('At which Expander?');

  var parseInta  = parseInt(expanderIndex);
  if (isNaN(parseInta)) {
    alert('Invalid input');
    return;
  }
  parseInta -= 1;

  const expanderButton = document.querySelectorAll('.expander');
  const expanderContent = document.querySelectorAll('.content');

  if (parseInta >= expanderButton.length || parseInta >= expanderContent.length) {
    alert('Expander not found');
    return;
  }

  const selectedExpanderButton = expanderButton[parseInta];
  const selectedExpanderContent = expanderContent[parseInta];

  var listIndex = prompt('Which list item?');
  var listParse  = parseInt(listIndex);
  if (isNaN(listParse)) {
    alert('Invalid input');
    return;
  }
  listParse -= 1;
  const nonNumberedList = selectedExpanderContent.querySelector('ul');
  const oldListItem = nonNumberedList.querySelectorAll('li');
  const selectedListItem = oldListItem[listParse];
  nonNumberedList.removeChild(selectedListItem);
}

setInterval(createBubbles, 1000);

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

/**
 * The `ClosePage` function retrieves all elements with the class 'expander',
 * converts them into an array, and maps them to an array of objects with the properties
 * 'id', 'name', 'childUl', and 'childLis'.
 * 
 * @return {void}
 */
 function ClosePage() {
  if (confirm('Do you really want to save?')) {
    // Retrieve all elements with the class 'expander' and convert them into an array.
    const expandButtons = Array.from(document.querySelectorAll('.expander'));

    // Map the 'expandButtons' array to an array of objects with the properties 'id', 'name', 'childUl', and 'childLis'.
    const expands = expandButtons.map((expand, index) => {
      // Retrieve the first 'ul' element that is a child of the 'expand' element.
      const childUl = expand.querySelector('ul');

      // If the 'childUl' element exists, retrieve all 'li' elements that are children of the 'childUl' element.
      // Otherwise, assign an empty array to 'childLis'.
      const childLis = childUl ? Array.from(childUl.querySelectorAll('li')) : [];

      // Return an object with the properties 'id', 'name', 'childUl', and 'childLis'.
      return { id: index, name: expand.textContent, ul: childUl, li: childLis };
    });

    // Set a cookie for each element in the 'expands' array.
    expands.forEach(element => {
      document.cookie = `${element.id}=${element.name}; expires=Wednesay, 01 February 23:00:00 UTC;`;

      element.li.forEach(listItem => {
        document.cookie = `${element.id}=${listItem.textContent}; expires=Wednesay, 01 February 23:00:00 UTC;`;
      })
    });

    // Display the value of the 'document.cookie' property.
    alert(document.cookie);
  }
}


   // document.cookie = "username=John Doe";
    //let x = document.cookie;
    //let user = getCookie("username");
    //alert("welcome" + user);
  