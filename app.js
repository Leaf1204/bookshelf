console.log("hello")
////api
///https://www.googleapis.com/books/v1/volumes?q=scifi&key=AIzaSyApx2mrOvapaQUu15bI9SnyJyUlalMPJIs
//https://tympanus.net/codrops/2011/08/16/circular-content-carousel/ link for 
$(()=>{
    $('#searchButton').on('click', (event)=>{
        console.log("clicked")
        

        const searchTerm = $('input[type="text"]').val();

        $.ajax({
            url:`https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&key=AIzaSyApx2mrOvapaQUu15bI9SnyJyUlalMPJIs`
        }).then(
            (data)=>{
                console.log(data)
            },
            ()=>{
                console.log('bad');
            }
        );
    })
})