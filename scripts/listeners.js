const onLoad = () => {
	onLoadLog();
  const $body = document.body;
  const $form = document.getElementById("input");
  const $input = $form.getElementsByTagName("input")[0];
  const $info = document.getElementById("info");
  const $infoTip = document.getElementById("info_tooltip");
  const $history = document.getElementById("commands");
  const $game = document.getElementById("game");
  let showInfo = false;
  let historyIndex = 0;
  
  /**
  * Always focus command line.
  */
  const focusInput = () => {
    $input.focus();
    showInfo = false;
    $infoTip.style.display = 'none';
  }
  
  /**
  * Toggle info element's visibility
  */
  const toggleInfo = (e) => {
    // Do not trigger focusInput.
    e.stopPropagation();
    showInfo = !showInfo;
 
    // Position tooltip then display / hide
    alignTooltip($infoTip, ()=> {
      $infoTip.style.display = showInfo ? 'block' : 'none';
    });
  }
  
  /**
  * When user sends command
  */
  const onCommand = (e) => {
    // Prevent page reload
    e.preventDefault();
    const command = $input.value;
 
    // Create and append node to history of commands.
    const $p = document.createElement('p');
    $p.innerText = command;
    $history.appendChild($p);
 
    // Scroll to bottom after command.
    $history.scrollTop = $history.scrollHeight;
    eval(command);
    $input.value = '';

    // Set historyIndex to point back to end of array
    historyIndex = $history.children.length;
  }
  
  /**
  * Fetch previous / next command depending on direction (up / down)
  */
  const fetchCommand = (dir) => {
    if ($history.children.length) {
      if (dir === -1) {       
        if (historyIndex > 0) {
          historyIndex -= 1;
        } else {
          historyIndex = $history.children.length - 1; 
        } 
      } else {
        if (historyIndex >= $history.children.length - 1) {
          historyIndex = 0;
        } else {
          historyIndex += 1;
        }
      }
      return $history.children[historyIndex].innerText;
    }
  }
  
  /**
  * If user presses arrow keys (up / down)
  */
  const onKeyPress = (e) => {
    if (e.keyCode === 38) {
      $input.value = fetchCommand(-1);
    } else if (e.keyCode === 40) {
      $input.value = fetchCommand(1);
    }
  }
  
  $body.addEventListener('click', focusInput);
  $info.addEventListener('click', toggleInfo);
  $form.addEventListener('submit', onCommand);
  $input.addEventListener('keydown', onKeyPress);
  
  // On load focus input by default
  focusInput();
  
  // Load "example" level on page load by default
  drawLevel($game);
}

document.addEventListener("DOMContentLoaded", function(event) {
	onLoad();
});