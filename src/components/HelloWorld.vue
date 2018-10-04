<template>
	<div>
		<button class="btn btn-primary" @click="getPdf">Download PDF</button>
	</div>
</template>
<script>
import axios from 'axios'
export default {
	methods: {
		getPdf() {
			console.log('hello')
			axios.post('http://localhost:3000/pdfcsv', { responseType: 'arraybuffer' }).then(response => {

				// console.log('response', response.data)

				// const blob = new Blob([response.data], {
				// 	type: "application/pdf"
				// })
				// const url = window.URL.createObjectURL(blob)
				

				// let csvName =
				// 	'Report Of The Daily Operating Time '
				// csvName = csvName.split(' ').join('_')

				// const a = document.createElement('a')
				// a.setAttribute('hidden', '')
				// a.setAttribute('href', response.data)
				// a.setAttribute('download', `${csvName}.pdf`)
				// document.body.appendChild(a)
				// a.click()
				// document.body.removeChild(a)

				console.log('response', response.data)

				const blob = new Blob([response.data], {
					type: "text/csv;charset=utf-8;"
				})
				const url = window.URL.createObjectURL(blob)
				

				let csvName =
					'Report Of The Daily Operating Time '
				csvName = csvName.split(' ').join('_')

				const a = document.createElement('a')
				a.setAttribute('hidden', '')
				a.setAttribute('href', url)
				a.setAttribute('download', `${csvName}.csv`)
				document.body.appendChild(a)
				a.click()
				document.body.removeChild(a)
			})
		}
	}
}
</script>

