'use strict'

let taskListHeight = function() {
    var formHeight = $("section.container form").innerHeight()
    var windowHeight = $(window).height()

    var height = windowHeight - formHeight
    $("section.container ul").css({"height": height})

    console.log(height)
}

$(document).ready(function () {
    $('textarea').elastic()

    $('button.open-folders').click(function () {
        $('aside.folders').toggleClass('open')
    })

    taskListHeight()
})
