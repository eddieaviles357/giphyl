const makeImg = (src='') => {
    let img = $('<img />', { class: 'giphy-img', src, alt: 'giphy-image'}).get(0);
    return img;
}

const getGiphy = async (e) => {
    e.preventDefault();
    try {
        // const url = `https://api.giphy.com/v1/gifs/random?api_key=${token}&tag=&rating=pg-13`
        const url = `https://api.giphy.com/v1/gifs/search`;
        const token = 'UD7tMu1ZjF9P5OGYlrJp3Q66jJa5JZq0';
        let $input = $('.inputs > input');
        let val = $input.val(); // extract user value
        let parameters = { params: { q: val, limit: 25, api_key: token } };
        $input.val(''); // reset value
        const {data: {data}} = await axios.get( url, parameters );
        let rand = Math.floor(Math.random() * data.length); // random giphyl
        $('.container').append(makeImg(data[rand].images.original.url));
    } catch (error) {
        $('.container').append($("<div class='error'>Could not retrieve Giphyl</div>"))
        return new Error(error.message);
    }
}

$('.giphy-form').on('submit', getGiphy);
$('.remove-btn').on('click', function(e) {
    $('.container').empty();
});

