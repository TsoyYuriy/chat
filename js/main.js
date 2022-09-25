'use strict'

const btn = document.querySelector('#btn');
const posts= document.querySelector('.posts');
const author = document.querySelector('#input-name');
const message = document.querySelector('#message');
let timeMessage = '';

const sendMessage = async function (author, message) {
	try {
		const data = new URLSearchParams();

		data.append('message', `${message}`);
		data.append('author', `${author}`);
		await fetch('http://146.185.154.90:8000/messages',{
			method: 'POST',
			body: data,
		})
	} catch (error) {
		console.log(error);
	}
}

const getMessage = async function () {
	try {
		const resp = await fetch (`http://146.185.154.90:8000/messages?datetime=${timeMessage}`);
		const messages = await resp.json();

		if (messages.length) {
			timeMessage = messages[messages.length - 1]['datetime'];
		}
		console.log(messages);

		messages.forEach(message => {
			createPost(message)

		});
	} catch (er) {
		console.log(er);
	}
}

const createPost = function (message) {
	const post = document.createElement('div');
	post.classList.add('post');
	post.innerHTML = `<div class="post__header">
											<p class="author"> 
												<span>Author:</span>
												${message.author}
											</p>
											<p class="date"> 
												<span>Date:</span>
												2022-09-21T10:02:14.376Z
											</p>
										</div>

										<p class="message">${message.message}</p>`
	posts.insertBefore(post, posts.firstChild)
}

btn.addEventListener('click', () => {
	const authorValue = author.value;
	const messageValue = message.value;
	author.value = '';
	message.value = '';
	
	sendMessage(authorValue, messageValue);
})
setInterval(() => {
	getMessage()
}, 2000);