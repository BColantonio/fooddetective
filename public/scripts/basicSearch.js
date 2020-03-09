$(document).ready(() => {
  $(`#img${getprodID}`).click(()=> {
    alert($(`#img${getprodID}`).val())
  })
  // $(`#img${getprodID}`).click(() => {
  //   alert('hm ok')
  // })
  // // let prodid = $( `${id}` )
  // console.log(prodid)
  // alert('testing');
});
