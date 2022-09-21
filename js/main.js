
const btn = document.querySelector('#btn');

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















btn.addEventListener('click', () => {
	const author = document.querySelector('#input-name').value;
	const message = document.querySelector('#message').value;

	sendMessage(author, message);
})