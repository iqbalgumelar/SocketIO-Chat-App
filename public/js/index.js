/**
* Author: Wilbert Muza
* Version: 1.0.0
* Signature: wmuza
*/

'use strict';

let Fake, i=0, my_username = '';	
const socket = io();		


$(document).ready( () => {	
	new MainChat();
});


// A base class is defined using the new reserved 'class' keyword
class MainChat  {
	// constructor
	constructor () {
		$('.messages-content').mCustomScrollbar();
		MainChat.LoadEventHandlers();		
	}	
	
	static setDate(){
	  let d = new Date();
	  let m = d.getMinutes();
	  $('<div class="timestamp">' + d.getHours() + ':' + m + '</div>').appendTo($('.message:last'));
	}
	
	static insertMessage() {
	  const msg = $('.message-input').val();
	  if ($.trim(msg) == '') return false;
	  $('.message-input').val(null);
	  MainChat.updateScrollbar();
	  // tell server to execute 'sendchat' and send along one parameter
	  socket.emit('sendchat', msg);
	}
		
	static LoadEventHandlers() {
			Fake = [ 'Hi there, I\'m Wilbert and you?', 'Nice to meet you', 'How are you?', 'Not too bad, thanks', 'What do you do?', 'That\'s awesome', 'Codepen is a nice place to stay', 'I think you\'re a nice person', 'Why do you think that?', 'Can you explain?', 'Anyway I\'ve gotta go now', 'It was a pleasure chat with you', 'Time to make a new codepen', 'Bye', ':)' ]

			$('.chat-title').on('click', () => {
				if ( $('.chat').height() == 500 )
					$( '.chat' ).animate({ height: 45 }, 1000 );
				else 
					$( '.chat' ).animate({ height: 500 }, 1000 );
				
				$('.message-box').slideToggle(300, 'swing');
				$('.chat-message-counter').fadeToggle(300, 'swing');
			});
			
			$('.message-submit').click( () => {
			  MainChat.insertMessage();
			});
			
			$(window).on('keydown', e => {
			  if (e.which == 13) {
				MainChat.insertMessage();
				return false;
			  }
			});
			
			
			// listener, whenever the server emits 'updatechat', this updates the chat body
			socket.on('updatechat',  (username, data) => {
					
				setTimeout( () => {
				$('.message.loading').remove();
				
				
				setTimeout( () =>	MainChat.fakeMessage(), 1000 + (Math.random() * 20) * 100);
				
			});
			
			
			// on connection to server, ask for user's name with an anonymous callback
			socket.on('connect', () => socket.emit('adduser', prompt("What's your name?")));
			
			// listener, whenever the server emits 'msg_user_found'
			socket.on('msg_user_found', username => socket.emit('msg_user', username, my_username, prompt("Type your message:")));
			
			
			// listener, whenever the server emits 'store_username', this updates the username
			socket.on('store_username', username => my_username = username);
	}

	
}










