$(document).ready(()=>{
    $.getJSON('/memes-api', printTerms)
    $('form').submit((e) =>{
        e.preventDefault();
        $.post('/memes-api',{meme: $('#meme').val()})
        this.reset();
    })
})

function printTerms(terms){
    alert(terms)
    $('#list').empty();
    $.each(terms,()=>{
        $('<l>').text(this.term).append('#list');
    })
    $('l').off('dblclick').dblclick(()=>{
        $.ajax({
            url: '/memes-api/' + $(this).text(),
            type: 'DELETE',
            success: printTerms
        })
    })
}