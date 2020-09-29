const CHAR_A = 'a'; 
let suggestion = [];
const MAX_NUM_SUGGESTION = 10;

class Node {
  constructor(){
  this.character = new Array(26)
  this.isLeaf = false;
  }
}

function getNewTrieNode(){
  let node = new Node();
  for(let i=0; i<26; i++)
    node.character[i] = null;
  return node;
}

function insert(head, str){
  let curr = head;
  for(let i=0; i<str.length; i++){
    if(curr.character[str.charCodeAt(i) - CHAR_A.charCodeAt(0)] == undefined){
      curr.character[str.charCodeAt(i) - CHAR_A.charCodeAt(0)] = getNewTrieNode();
    }
    curr = curr.character[str.charCodeAt(i) - CHAR_A.charCodeAt(0)];
  }
  curr.isLeaf = 1;
}

function search(head, str){
  if(head == undefined)
    return head;
  var curr = head;
  for(let i=0; i< str.length; i++){
    curr = curr.character[str.charCodeAt(i) - CHAR_A.charCodeAt(0)];
    if(curr == undefined)
      return curr;
  }
  return curr;
}

function computeSuggestion(head, str){
  if(suggestion.length == MAX_NUM_SUGGESTION)
    return;
  
  if(head == undefined)
    return;
  
  if(head.isLeaf == true)
    suggestion.push(str);

  for(let i=0; i<26; i++){
    if(suggestion.length == MAX_NUM_SUGGESTION)
      return;
    if(head.character[i] != undefined){
      computeSuggestion(head.character[i], str+String.fromCharCode(i+97));
    }
  } 
}

function getSuggestion(head,str){
  let node = search(head, str);
  if(node != undefined){
    computeSuggestion(node, str);
  }
}

// head node of trie
let head = getNewTrieNode();

/*On event functions*/
function onInsert(){
  let value = document.getElementById('text').value;
  insert(head,value.trim());
  document.getElementById('text').value = '';
  // console.log(search(head,value).isLeaf);
  var x = document.createElement('li');
  var t = document.createTextNode(value.trim());
  x.appendChild(t);
  document.getElementById('list').appendChild(x);
}


function onType(){
  var dataList = document.getElementById('suggestion-datalist');
  suggestion = [];
  let value = document.getElementById('search').value;
  getSuggestion(head, value.trim());
  
  //clear list before appending new suggestions
  dataList.innerHTML = '';
  suggestion.forEach(function(item) {
    var option = document.createElement('option');
    option.value = item;  
    dataList.appendChild(option);
  });
} 