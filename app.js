console.log("hello")
////api
///https://www.googleapis.com/books/v1/volumes?q=scifi&key=AIzaSyApx2mrOvapaQUu15bI9SnyJyUlalMPJIs
//https://tympanus.net/codrops/2011/08/16/circular-content-carousel/ link for 
$(()=>{
    let currentImgIndex = 0
    let highestIndex = 0
    $('#searchButton').on('click', (event)=>{
        console.log("clicked")
        
        $('.container2').css("display", "flex");
        $('#results').empty();
        currentImgIndex = 0;
        const searchTerm = $('input[type="text"]').val();
        
        /////checkboxes
        let searchUrl = `https://www.googleapis.com/books/v1/volumes?q=subject:${searchTerm}&printType=books&maxResults=40&&orderBy=newest&key=AIzaSyApx2mrOvapaQUu15bI9SnyJyUlalMPJIs`
        
        let filter = $('input[name=filter]:checked').val();
        if (filter !== undefined){
            searchUrl+=`&filter=${filter}`
        }

        $.ajax({
            url: searchUrl
        }).then(
            (data)=>{
                console.log(data)
                for(let i=0; i<data.items.length; i++){
                    const item = data.items[i];
                    const $slide=$(`<div/>`);
                    $slide.addClass('slide');
                    if (i!=0){
                        $slide.css("display", "none")
                    }
                    $('#results').append($slide);
                    const $bookCover = $(`<div/>`);
                    $bookCover.addClass('bookcover');
                    const $bookImage = $(`<img/>`);
                    $bookCover.append($bookImage);
                    const imgUrl = item.volumeInfo.imageLinks.smallThumbnail;
                    $bookImage.attr('src',imgUrl )

                    $slide.append($bookCover);
                    
                    const $bookInfo=$(`<div/>`);
                    $bookInfo.addClass('bookInfo');
                    $slide.append($bookInfo);
                    
                    const $title =$('<p/>');
                    $bookInfo.append($title);
                    const bookTitle = item.volumeInfo.title;
                    $title.html(`<b>Title</b>: ${bookTitle}`);

                    if(item.volumeInfo.authors !== undefined){

                        
                        const $authors = $('<p/>');
                        $bookInfo.append($authors);
                        let authors = ""
                        for (const element of item.volumeInfo.authors){
                            authors += element + ","
                        }
                        $authors.html(`<b>Author(s)</b>: ${authors.replace(/,+$/,"")}`);
                    }
                    const $summary = $('<p/>');
                    $bookInfo.append($summary);
                    let summary = item.volumeInfo.description;
                    $summary.html(`<b>Summary</b>: ${summary}`);
                    highestIndex = i;
                }
            },
            ()=>{
                console.log('bad');
            }
        );
    })
   
        $(".next").on("click", () => {
  // stuff will go here
    console.log("Next was clicked");
    $("#results").children().eq(currentImgIndex).css("display", "none");
      // Wrap the carousel back to zero if on the last image:
  if (currentImgIndex < highestIndex) {
    currentImgIndex++;
  } else {
    currentImgIndex = 0;
  }
  $("#results").children().eq(currentImgIndex).css("display", "flex");
});
})