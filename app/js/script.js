$(document).ready(function () {
    $('textarea').elastic()

    $('button.open-folders').click(function () {
        $('aside.folders').toggleClass('open')
    })
})
