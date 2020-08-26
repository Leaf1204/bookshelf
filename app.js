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
                ///to do make div per book
                //loop the data 
                ///data.items.length to itterate the array
                for(let i=0; i<data.items.length; i++){
                    const $newBook = $('<div>')
                    $('#results').append($newBook)
                }
            },
            ()=>{
                console.log('bad');
            }
        );
    })
})