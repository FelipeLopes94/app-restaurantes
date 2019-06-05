//registro do service Worker, buscando o mesmo.

if ('serviceWorker' in navigator) {
	navigator.serviceWorker.register('./sw.js')
	.then(function() {
		console.log('Service Work Rodando');
	})
	.catch(function() {
		console.log('Problema ao executar o service Work');
	});

}
//Após este registro, o service worker ira processar os eventos.