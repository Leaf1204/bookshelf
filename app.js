console.log("hello")
////api
///https://www.googleapis.com/books/v1/volumes?q=scifi&key=AIzaSyApx2mrOvapaQUu15bI9SnyJyUlalMPJIs
//https://tympanus.net/codrops/2011/08/16/circular-content-carousel/ link for 
$(()=>{
    let currentImgIndex = 0
    let highestIndex = 0
    $('#searchButton').on('click', (event)=>{
        console.log("clicked")
        
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
                
                if(data.totalItems === 0){
                    $('#books').css("display", "none");
                    $('#noBooks').css("display", "flex");
                    return
                }else{
                    $('#books').css("display", "flex");
                    $('#noBooks').css("display", "none");
                }

                
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
                    if (item.volumeInfo.imageLinks !== undefined){
                        const imgUrl = item.volumeInfo.imageLinks.smallThumbnail;
                        $bookImage.attr('src',imgUrl )
                    }
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
                    if(item.volumeInfo.description !== undefined){
                        let summary = item.volumeInfo.description;
                        if(summary.length>350) {
                            $summary.html(`<b>Summary</b>: ${summary.substring(0,350)}...`);
                        }else {
                            $summary.html(`<b>Summary</b>: ${summary}`);
                        }
                    }

                    
                        const $dateBook = $(`<button id="dateBook${i}"   class="button">what to "date" this book?</button>`);
                        $summary.append($dateBook);
                        $(`#dateBook${i}`).on("click", () => {
                          console.log("date button was clicked");
                          const dateBook = item.volumeInfo.canonicalVolumeLink;
                          window.open(dateBook,'_blank' // <- This is what makes it open in a new window.
                            );
                            console.log(dateBook);
                        });
                    
                    highestIndex = i;
                }
            },
            ()=>{
                console.log('bad');
            }
        );
    })
   
    $(".previous").on("click", () => {
      console.log("previous was clicked");
      $('#results').children().eq(currentImgIndex).css("display", "none");
      if (currentImgIndex > 0) {
        currentImgIndex--;
      } else {
        currentImgIndex = 0;
      }
      $("#results").children().eq(currentImgIndex).css("display", "flex");
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