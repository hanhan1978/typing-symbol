"use strict";

var count=0;
var miss =0;
var end = false;
var MAX = 4;


class Keys {
  constructor(){
    this.key_arr = [];
    this.chs = [];
  }
  addKey (ch, code, shift) {
    this.key_arr.push([ch, code, shift]);
  }
  createKeyArr(){
    for(let i=0; i<this.key_arr.length; i++){
      this.chs.push(this.key_arr[i][0]);
    }
  }
  getNextId(){
    let id = Math.floor(Math.random() * (this.chs.length));
    if(!this.cur_id){
      return id; 
    }
    if(this.cur_id == id){
      return getNextId();
    }
    return id;
  }
  nextChar(){
    let id = this.getNextId();
    this.cur_id    = id; 
    this.cur_ch    = this.key_arr[id][0];
    this.cur_code  = this.key_arr[id][1];
    this.cur_shift = this.key_arr[id][2];
  }

  findChar(code, shift){
    for(let i=0; i<this.key_arr.length; i++){
      if(code === this.key_arr[i][1] && shift === this.key_arr[i][2]){
        return this.key_arr[i][0];
      }
    }
    return '';
  }
}

var k = new Keys();
k.addKey(')', 48 , true);
k.addKey('!', 49, true);
k.addKey('@', 50, true);
k.addKey('#', 51, true);
k.addKey('$', 52, true);
k.addKey('%', 53, true);
k.addKey('^', 54, true);
k.addKey('&', 55, true);
k.addKey('*', 56, true);
k.addKey('(', 57 , true);
k.addKey(';', 186, false);
k.addKey(':', 186, true);
k.addKey('=', 187, false);
k.addKey('+', 187, true);
k.addKey(',', 188, false);
k.addKey('<', 188, true);
k.addKey('-', 189, false);
k.addKey('_', 189, true);
k.addKey('.', 190, false);
k.addKey('>', 190, true);
k.addKey('/', 191, false);
k.addKey('`', 192, false);
k.addKey('~', 192, true);
k.addKey('[', 219 , false);
k.addKey('{', 219 , true);
k.addKey('|', 220, true);
k.addKey('\\', 220, false);
k.addKey(']', 221, false);
k.addKey('}', 221, true);
k.addKey("'", 222, false);
k.addKey('"', 222, true);
k.createKeyArr();

hoge();
function hoge(){
  if(end) return;
  var element = document.getElementById('word-display');
  if(element.classList.contains('word-display--move')){
    console.log('remove');
    element.classList.remove('word-display--move');
  }
  element.style.color = "#D36015" ;
  k.nextChar();
  element.textContent = k.cur_ch;
}


document.onkeydown = function(e){
  if(end) return;
  var key_code = e.keyCode;
  var shift_key = e.shiftKey;
  var ctrl_key = e.ctrlKey;
  var alt_key = e.altKey;

  var ans = document.getElementById('answer-display');
  var ch = '';
  console.log('key => ' + key_code + ' shift => ' + shift_key);
  if(key_code == 16 || key_code == 13){
    return;
  }
  ch = k.findChar(key_code, shift_key);
  console.log(ch);
  
  ans.textContent = ch; 

  var word = document.getElementById('word-display');
  if(word.textContent == ch){
    bingo(true);
  }else{
    bingo(false);
  }
  if(count >= MAX){
    end = true;
    displayResult();
    return;
  }
}

function bingo(st){
  var status = document.getElementById('status-display');
  if(st){
    count++;
    status.style.color = "blue" ;
    status.textContent = 'bingo!!';
    setTimeout(function(){hoge();}, 150);
    setTimeout(function(){startAnimation();}, 350);
  }else{
    miss++;
    status.style.color = "red" ;
    status.textContent = 'kusoga';
  }
}

function displayResult(){
  var str = "total types " + count + "<br>";
  str += "miss types " + miss + "<br>";
  str += "You are [<strong>" + getStatus(miss) + "</strong>] <br>";
  var result = document.getElementById('result-display');
  result.style.display = 'block';
  result.innerHTML = str;
}

function getStatus(miss){
  if(miss == 0){
    return 'Normal';
  }
  return 'KUSO';
}

window.onload = startAnimation ;
    
function startAnimation(){
  var element = document.getElementById('word-display');
  element.classList.add('word-display--move');
  console.log('started');
}
